import cn from "classnames";

import { Card } from "../Card/Card";
import RateIcon from "./rate.svg";
import styles from "./HhData.module.css";
import { HhDataProps } from "./HhData.props";
import { priceEu } from "../../helpers/helpers";

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>All vacancies</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Begginer</div>
          <div className={styles.salaryValue}>
            {priceEu(Math.round(juniorSalary / 95))}
          </div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Middle</div>
          <div className={styles.salaryValue}>
            {priceEu(Math.round(middleSalary / 95))}
          </div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Professional</div>
          <div className={styles.salaryValue}>
            {priceEu(Math.round(seniorSalary / 95))}
          </div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
