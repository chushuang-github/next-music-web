import { memo } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { Row, Col } from "antd";
import GridViewItem from "../grid-view-item";
import type { FC, ReactElement } from "react";
import type { IHotProduct, IProductItem } from "@/service/home";

interface IProps {
  children?: ReactElement;
  products?: IHotProduct[];
}

const GridView: FC<IProps> = (props) => {
  const { products } = props;
  const router = useRouter();

  const handleItemClick = (product: IProductItem) => {
    router.push({
      pathname: "/good-detail",
      query: {
        q: product.name,
        id: product.id,
      },
    });
  };

  return (
    <div className={styles["grid-view"]}>
      <Row>
        {products?.map((item, index) => {
          return (
            <Col span={6} key={item.id}>
              <div className={styles["view-item"]}>
                <GridViewItem
                  onItemClick={handleItemClick}
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
