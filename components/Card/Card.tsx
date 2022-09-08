import cn from "classnames";
import { forwardRef, ForwardedRef } from "react";

import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

// eslint-disable-next-line react/display-name
export const Card = forwardRef(
  (
    { color = "white", children, className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(className, styles.card, {
          [styles.blue]: color == "blue",
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
