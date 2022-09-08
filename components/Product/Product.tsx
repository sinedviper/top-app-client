import { ForwardedRef, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { motion } from "framer-motion";

import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceEu } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const Product = motion(
  // eslint-disable-next-line react/display-name
  forwardRef(
    (
      { className, product, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: {
          opacity: 1,
          height: "auto",
        },
        hidden: {
          opacity: 0,
          height: 0,
        },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={className} {...props} ref={ref} tabIndex={0}>
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
              <span>
                <span className='visualHidden'>price</span>
                {priceEu(Math.round(product.price / 95))}
              </span>
              {product.oldPrice && (
                <Tag color='green' className={styles.oldPrice}>
                  <span>
                    <span className='visualHidden'>sale</span>
                    {priceEu(
                      Math.round((product.price - product.oldPrice) / 95)
                    )}
                  </span>
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span>
                <span className='visualHidden'>credit</span>
                {priceEu(Math.round(product.credit / 95))}/
              </span>
              <span className={styles.month}>month</span>
            </div>
            <div className={styles.rating}>
              <span className='visualHidden'>
                {"rating" + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag key={c} color='ghost' className={styles.category}>
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              price
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              credit
            </div>
            <div className={styles.rateTitle}>
              <a href='#ref' onClick={scrollToReview}>
                {product.reviewCount}{" "}
                {declOfNum(product.reviewCount, [
                  "review",
                  "reviews",
                  "reviews",
                ])}
              </a>
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
          <motion.div
            animate={isReviewOpened ? "visible" : "hidden"}
            variants={variants}
            initial='hidden'
          >
            <Card
              color='blue'
              className={cn(styles.reviews)}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
