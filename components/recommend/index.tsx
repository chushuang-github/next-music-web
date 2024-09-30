import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { Col, Row } from "antd";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { IRecommend } from "@/service/home";

interface IProps {
  children?: ReactElement;
  recommends?: IRecommend[];
}

const Recommend: FC<IProps> = (props) => {
  const { recommends } = props;

  return (
    <div className={styles.recommend}>
      <div className={classNames("wrapper", styles.content)}>
        <Row>
          {recommends?.map((item) => {
            return (
              <Col span={12} key={item.id}>
                <Link href={`/detail?id=${item.id}`}>
                  <div className={"recommend-item"}>
                    {/* priority 启用预加载 */}
                    <Image
                      className={styles.image}
                      src={item.picStr!}
                      width={542}
                      priority
                      height={300}
                      alt="hy next"
                    ></Image>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

Recommend.displayName = "Recommend";
export default memo(Recommend);
