import cn from "classnames";

import { HeaderProps } from "./Header.props";
import styles from "./Siderbar.module.css";

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return <div {...props}>Header</div>;
};
