import { memo } from "react";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";

interface IProps {
  children?: ReactElement;
  title?: string;
}

const SectionTitle: FC<IProps> = (props) => {
  const { title } = props;
  return <div className={styles["section-title"]}>{title}</div>;
};

SectionTitle.displayName = "SectionTitle";
export default memo(SectionTitle);
