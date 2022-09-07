import cn from "classnames";
import { useForm, Controller } from "react-hook-form";

import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError("That's not right");
      }
      return {};
    } catch (err) {
      setIsError("Something went wrong, refresh the page");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Fill the name" },
            minLength: 5,
          })}
          placeholder='Name'
          error={errors.name}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Fill the title" },
            minLength: 5,
          })}
          placeholder='Title review'
          className={styles.title}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Grade:</span>
          <Controller
            control={control}
            name='rating'
            rules={{
              required: { value: true, message: "Fill the rating" },
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Fill the description" },
            minLength: 10,
            maxLength: 255,
          })}
          placeholder='Text review'
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance='primary'>Send</Button>
          <span className={styles.info}>
            * Before publication, the review will be pre-moderated and checked
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Your review send</div>
          <div>Thanks, your review be publication after check</div>
          <CloseIcon
            className={styles.close}
            onClick={() => setIsSuccess(false)}
          />
        </div>
      )}
      {isError && (
        <div className={cn(styles.error, styles.panel)}>
          <span>{isError}</span>
          <CloseIcon className={styles.close} onClick={() => setIsError("")} />
        </div>
      )}
    </form>
  );
};
