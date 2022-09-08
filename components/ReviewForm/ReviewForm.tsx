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
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
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
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Fill the name" },
            minLength: 5,
          })}
          placeholder='Name'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Fill the title" },
            minLength: 5,
          })}
          placeholder='Title review'
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
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
                tabIndex={isOpened ? 0 : -1}
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
          tabIndex={isOpened ? 0 : -1}
          aria-label='Text review'
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearance='primary'
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Send
          </Button>
          <span className={styles.info}>
            * Before publication, the review will be pre-moderated and checked
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role='alert'>
          <div className={styles.successTitle}>Your review send</div>
          <div>Thanks, your review be publication after check</div>
          <button
            onClick={() => setIsSuccess(false)}
            className={styles.close}
            aria-label='close alert'
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {isError && (
        <div className={cn(styles.error, styles.panel)} role='alert'>
          <span>{isError}</span>
          <button
            onClick={() => setIsError("")}
            className={styles.close}
            aria-label='close alert'
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
