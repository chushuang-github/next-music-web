import { memo } from "react";
import wrapperStore from "@/store";
import { fetchSearchSuggest } from "@/store/modules/home";
import { getHomeInfoData } from "@/service/home";
import TopSwiper from "@/components/top-swiper";
import TabCategory from "@/components/tab-category";
import Recommend from "@/components/recommend";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { IBanner, ICategory, IDigital, IRecommend } from "@/service/home";

export interface IProps {
  children?: ReactElement;
  banners: IBanner[];
  categorys: ICategory[];
  recommends: IRecommend[];
  digitalData: IDigital;
}

const Home: FC<IProps> = memo((props) => {
  const { banners, categorys, recommends } = props;
  return (
    <div className={styles.home}>
      <TopSwiper banners={banners}></TopSwiper>
      <TabCategory categorys={categorys}></TabCategory>
      <Recommend recommends={recommends}></Recommend>
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
      // 触发一个异步的action来发起网络请求，拿到搜索建议并存储到redux仓库中
      await store.dispatch(fetchSearchSuggest());
      // 发起网络请求获取首页数据：轮播图、分类、推荐...
      const res = await getHomeInfoData();

      return {
        props: {
          banners: res.data.banners || [],
          categorys: res.data.categorys || [],
          recommends: res.data.recommends || [],
          digitalData: res.data.digitalData || {},
        },
      };
    };
  });
