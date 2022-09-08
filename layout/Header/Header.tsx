import { useEffect, useState } from "react";
import cn from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";

import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import LogoSvg from "../logo.svg";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { Sidebar } from "../Sidebar/Sidebar";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: "100%",
    },
  };

  return (
    <div className={cn(className, styles.header)} {...props}>
      <LogoSvg />
      <ButtonIcon
        appearance='primary'
        icon='menu'
        onClick={() => setIsOpened(!isOpened)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={"closed"}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon
          onClick={() => setIsOpened(!isOpened)}
          className={styles.closeMenu}
          appearance='primary'
          icon='close'
        />
      </motion.div>
    </div>
  );
};
