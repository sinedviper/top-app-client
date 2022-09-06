/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import cn from "classnames";

import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceEu } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import { useState } from "react";
import { Review } from "../Review/Review";

export const Product = ({ product }: ProductProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  return (
    <>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceEu(Math.round(product.price / 95))}
          {product.oldPrice && (
            <Tag color='green' className={styles.oldPrice}>
              {priceEu(Math.round((product.price - product.oldPrice) / 95))}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceEu(Math.round(product.credit / 95))}/
          <span className={styles.month}>month</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag key={c} color='ghost' className={styles.category}>
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>price</div>
        <div className={styles.creditTitle}>credit</div>
        <div className={styles.rateTitle}>
          {product.reviewCount}{" "}
          {declOfNum(product.reviewCount, ["review", "reviews", "reviews"])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Benefits</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Limitations</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Learn more</Button>
          <Button
            appearance='ghost'
            arrow={isReviewOpened ? "down" : "right"}
            className={styles.reviewButton}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Read reviews
          </Button>
        </div>
      </Card>
      <Card
        color='blue'
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.length &&
          product.reviews.map((r) => (
            <>
              <Review key={r._id} review={r} />
              <Divider />
            </>
          ))}
      </Card>
    </>
  );
};