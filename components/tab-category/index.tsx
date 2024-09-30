import { memo } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Row, Col } from "antd";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { ICategory } from "@/service/home";

export interface IProps {
  children?: ReactElement;
  categorys: ICategory[];
}
const TabCategory: FC<IProps> = memo((props) => {
  const { categorys } = props;

  return (
    <div className={styles["tab-category"]}>
      <div className={classNames("wrapper", styles.content)}>
        <Row>
          {categorys?.map((item) => {
            return (
              <Col span={6} key={item.cid}>
                {/* span: 栅格占位6格数,all屏幕 */}
                <div className={styles["category-item"]}>
                  <Image
                    className={styles.image}
                    src={item.picStr!}
                    width={48}
                    height={48}
                    alt="hy next"
                  ></Image>
                  <div className={styles.right}>
                    <div className={styles.title}>{item.title}</div>
                    {item.type === 1 && (
                      <div className={styles["sub-title"]}>
                        <span className={styles.count}>{item.count}</span>
                        <span>{item.desc}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
});

TabCategory.displayName = "TabCategory"; // 方便调试用的
export default TabCategory;
