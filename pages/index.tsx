import { memo } from "react";
import wrapperStore from "@/store";
import { fetchSearchSuggest } from "@/store/modules/home";
import type { FC, ReactElement } from "react";
import type { GetServerSideProps } from "next";

export interface IProps {
  children?: ReactElement;
}
const Home: FC<IProps> = memo(() => {
  return (
    <div className="home">
      <div>Home</div>
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

      return {
        props: {},
      };
    };
  });
