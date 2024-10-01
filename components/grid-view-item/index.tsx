import { memo } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { IProductItem } from "@/service/home";

interface IProps {
  children?: ReactElement;
  product: any;
  showTip?: boolean;
}

const GridViewItem: FC<IProps> = (props) => {
  const { product, showTip = false } = props;
  const productItem: IProductItem = product.products
    ? product.products
    : product;

  return (
    <div className={styles["grid-view-item"]}>
      <div className={styles["item-image"]}>
        <Image
          className={styles.image}
          src={productItem.coverUrl!}
          alt={"music"}
          width={263}
          height={263}
        />
        {showTip && (
          <div className={styles.tip}>
            <div>¥{productItem.minPrice}</div>
            <div className={styles["original-cost"]}>
              ¥{productItem.originalCost}
            </div>
          </div>
        )}
      </div>
      <div className={styles["item-info"]}>
        {/* label */}
        {productItem.couponLabelDesc && (
          <span className={styles.label}>{productItem.couponLabelDesc}</span>
        )}
        <a className={styles.name}>{productItem.name}</a>
      </div>
      <div className={styles["item-price"]}>¥{productItem.minPrice}</div>
    </div>
  );
};

GridViewItem.displayName = "GridViewItem";
export default memo(GridViewItem);
