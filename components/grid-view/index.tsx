import { memo } from "react";
import styles from "./index.module.scss";
import { Row, Col } from "antd";
import GridViewItem from "../grid-view-item";
import type { FC, ReactElement } from "react";
import type { IHotProduct, IProductItem } from "@/service/home";

interface IProps {
  children?: ReactElement;
  products?: IHotProduct[] | IProductItem[];
}

const GridView: FC<IProps> = (props) => {
  const { products } = props;

  return (
    <div className={styles["grid-view"]}>
      <Row>
        {products?.map((item, index) => {
          return (
            <Col span={6} key={item.id}>
              <div className={styles["view-item"]}>
                <GridViewItem
                  showTip={index === 0}
                  product={item}
                ></GridViewItem>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

GridView.displayName = "GridView";
export default memo(GridView);
