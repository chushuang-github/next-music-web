import { memo } from "react";
import Link from "next/link";
import classNames from "classnames";
import { shallowEqual, useSelector } from "react-redux";
import Search from "../search";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { IRootState } from "@/store";

export interface IProps {
  children?: ReactElement;
}
const Navbar: FC<IProps> = memo(() => {
  const { navbar } = useSelector((state: IRootState) => {
    return {
      navbar: state.home.navbar,
    };
  }, shallowEqual);

  return (
    <div className={styles.navbar}>
      <div className={classNames("wrapper", styles.content)}>
        <div className={styles["content-left"]}>
          <Link href="/" className={styles.logo} />
          <h1 className={styles.title}>云音乐商城 - 音乐购有趣</h1>
        </div>
        <div className={styles["content-right"]}>
          <Search searchData={navbar} />
          <div className={styles["right-cart"]}>
            <Link href="/" className={styles.cart}>
              <span className={styles.count}>0</span>
            </Link>
          </div>
          <div className={styles["right-login"]}>login</div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar"; // 方便调试用的
export default Navbar;
