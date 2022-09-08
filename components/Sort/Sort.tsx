/* eslint-disable jsx-a11y/role-supports-aria-props */
import cn from "classnames";

import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";

export const Sort = ({
  setSort,
  sort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id='sort'>
        Sort
      </div>
      <button
        id='rating'
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort == SortEnum.Rating,
        })}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby='sort rating'
      >
        <SortIcon className={styles.sortIcon} />
        By rating
      </button>
      <button
        id='price'
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort == SortEnum.Price,
        })}
        aria-selected={sort == SortEnum.Price}
        aria-labelledby='sort price'
      >
        <SortIcon className={styles.sortIcon} />
        By price
      </button>
    </div>
  );
};
