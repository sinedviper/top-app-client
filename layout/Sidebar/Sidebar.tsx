import cn from "classnames";
import { Menu } from "../Menu/Menu";

import { SidebarProps } from "./Sidebar.props";
import LogoSvg from "../logo.svg";

import styles from "./Sidebar.module.css";
import { Search } from "../../components";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <LogoSvg className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};
