import { memo } from "react";
import wrapperStore from "@/store";
import { fetchSearchSuggest } from "@/store/modules/home";
import {
  getHomeInfoData,
  getHotProductV2Data,
  getAllProductData,
} from "@/service/home";
import TopSwiper from "@/components/top-swiper";
import TabCategory from "@/components/tab-category";
import Recommend from "@/components/recommend";
import SectionTitle from "@/components/section-title";
import GridView from "@/components/grid-view";
import DigitalPanel from "@/components/digital-panel";
import styles from "./index.module.scss";
import classNames from "classnames";
import type { FC, ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type {
  IBanner,
  ICategory,
  IDigital,
  IRecommend,
  IHotProduct,
  IProductItem,
} from "@/service/home";

export interface IProps {
  children?: ReactElement;
  banners: IBanner[];
  categorys: ICategory[];
  recommends: IRecommend[];
  digitalData: IDigital;
  hotProducts: IHotProduct[];
  allProducts: IProductItem[];
}

const Home: FC<IProps> = memo((props) => {
  const {
    banners,
    categorys,
    recommends,
    digitalData,
    hotProducts,
    allProducts,
  } = props;

  return (
    <div className={styles.home}>
      <TopSwiper banners={banners}></TopSwiper>
      <TabCategory categorys={categorys}></TabCategory>
      <Recommend recommends={recommends}></Recommend>
      {/* 中间的内容 */}
      <div className={classNames("wrapper", styles.content)}>
        <SectionTitle title="编辑推荐"></SectionTitle>
        <GridView products={hotProducts}></GridView>
        <DigitalPanel itemData={digitalData}></DigitalPanel>
        <SectionTitle title="热门商品"></SectionTitle>
        <GridView products={allProducts}></GridView>
      </div>
    </div>
  );
});

Home.displayName = "Home"; // 方便调试用的
export default Home;

// 每次访问首页的时候执行
// 注意在getServerSideProps，函数里面如何dispatch一个action
export const getServerSideProps: GetServerSideProps =
  wrapperStore.getServerSideProps((store) => {
    return async () => {
      // 1.触发一个异步的action来发起网络请求，拿到搜索建议并存储到redux仓库中
      await store.dispatch(fetchSearchSuggest());
      // 2.发起网络请求获取首页数据：轮播图、分类、推荐...
      const res = await getHomeInfoData();
      // 3.编辑推荐的商品
      const resHot = await getHotProductV2Data();
      // 4.热门商品
      const resAll = await getAllProductData();

      return {
        props: {
          banners: res.data.banners || [],
          categorys: res.data.categorys || [],
          recommends: res.data.recommends || [],
          digitalData: res.data.digitalData || {},
          hotProducts: resHot.data.hotProduct || [],
          allProducts: resAll.data.allProduct || [],
        },
      };
    };
  });
