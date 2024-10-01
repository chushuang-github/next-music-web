import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { IHotProduct, IProductItem } from "@/service/home";

interface IProps {
  children?: ReactElement;
  product: IHotProduct;
  showTip?: boolean;
  onItemClick?: (product: any) => void;
}

const GridViewItem: FC<IProps> = (props) => {
  const { product, showTip = false, onItemClick } = props;
  const productItem: IProductItem = product.products;

  const handleItemClick = () => {
    onItemClick && onItemClick(productItem);
  };

  return (
    <div className={styles["grid-view-item"]} onClick={handleItemClick}>
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
        {/* Link */}
        <Link href={`/detail?id=${productItem.id}`} className={styles.name}>
          {productItem.name}
        </Link>
      </div>
      <div className={styles["item-price"]}>¥{productItem.minPrice}</div>
    </div>
  );
};

GridViewItem.displayName = "GridViewItem";
export default memo(GridViewItem);
