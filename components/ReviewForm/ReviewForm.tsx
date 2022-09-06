import cn from "classnames";

import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  return <div className={cn(className, styles.reviewForm)} {...props}></div>;
};
