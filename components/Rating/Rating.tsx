import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";

import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from "./star.svg";

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(
  (
    {
      error,
      isEditable = false,
      tabIndex,
      rating,
      setRating,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };

    const onclick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code == "ArrowRight" || e.code == "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    const computerFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }

      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }

      if (r == i + 1) {
        return tabIndex ?? 0;
      }

      return -1;
    };

    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, tabIndex]);

    const constructRating = (currentRating: number) => {
      const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onclick(i + 1)}
            tabIndex={computerFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r) => ratingArrayRef.current?.push(r)}
            // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
            role={isEditable ? "slider" : ""}
            aria-valuenow={rating}
            aria-invalid={error ? true : false}
            aria-valuemax={5}
            aria-label={isEditable ? "Type rating" : "rating " + rating}
            aria-valuemin={1}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updateArray);
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
