import { memo } from "react";
import classNames from "classnames";
import wrapperStore from "@/store";
import { fetchSearchSuggest } from "@/store/modules/home";
import { getProductSearchData } from "@/service/search";
import styles from "./index.module.scss";
import GridView from "@/components/grid-view";
import type { FC, ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { IProductItem } from "@/service/search";

export interface IProps {
  children?: ReactElement;
  products: IProductItem[];
}

const Search: FC<IProps> = memo((props) => {
  const { products } = props;

  return (
    <div className={styles.search}>
      <div className={classNames("wrapper")}>
        <GridView products={products}></GridView>
      </div>
    </div>
  );
});

Search.displayName = "Search"; // 方便调试用的
export default Search;

// 每次访问首页的时候执行
// 注意在getServerSideProps，函数里面如何dispatch一个action
export const getServerSideProps: GetServerSideProps =
  wrapperStore.getServerSideProps((store) => {
    return async (context) => {
      const q = context.query.q;
      // 1.触发一个异步的action来发起网络请求，拿到搜索建议并存储到redux仓库中
      await store.dispatch(fetchSearchSuggest());
      // 2.搜索
      const res = await getProductSearchData({
        limit: 60,
        offset: 0,
        q: q as string,
      });

      return {
        props: {
          products: res.products,
        },
      };
    };
  });
