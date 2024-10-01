import { memo } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import wrapperStore from "@/store";
import { fetchSearchSuggest } from "@/store/modules/home";
import { getProductDetailData } from "@/service/detail";
import styles from "./index.module.scss";
import GridView from "@/components/grid-view";
import type { FC, ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { IDetailProduct } from "@/service/detail";

export interface IProps {
  children?: ReactElement;
  detailData: IDetailProduct;
}

const Detail: FC<IProps> = memo((props) => {
  const { detailData } = props;

  return (
    <div className={styles.detail}>
      <div className={classNames("wrapper", styles.content)}>
        <div className={styles.banner}>
          <Link href="/">
            <Image src={detailData.webPic} alt="air" fill priority></Image>
          </Link>
        </div>
        <GridView products={detailData.products}></GridView>
      </div>
    </div>
  );
});

Detail.displayName = "Detail"; // 方便调试用的
export default Detail;

// 每次访问首页的时候执行
// 注意在getServerSideProps，函数里面如何dispatch一个action
export const getServerSideProps: GetServerSideProps =
  wrapperStore.getServerSideProps((store) => {
    return async (context) => {
      const id = context.query.id;
      // 1.触发一个异步的action来发起网络请求，拿到搜索建议并存储到redux仓库中
      await store.dispatch(fetchSearchSuggest());
      // 2.详情
      const res = await getProductDetailData(id as string);

      return {
        props: {
          detailData: res.data,
        },
      };
    };
  });
