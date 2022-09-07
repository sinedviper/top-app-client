import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import cn from "classnames";

import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from "./star.svg";

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(
  (
    { error, isEditable = false, rating, setRating, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

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
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
                isEditable && handleSpace(i + 1, e)
              }
            />
          </span>
        );
      });
      setRatingArray(updateArray);
    };

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

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
      if (e.code != "Space" || !setRating) {
        return;
      }
      setRating(i);
    };

    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

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
