import hyRequest from "./index";
import type { ResultData } from "./index";

// 搜索建议
export interface ISearchSuggest {
  id: number;
  defaultKey: string;
  configKey: Array<any>;
}

// 轮播图
export interface IBanner {
  id: number;
  picStr?: string;
  backendPicStr?: string;
}

// 分类
export interface ICategory {
  cid: number;
  picStr?: string;
  title?: string;
  tabIndex?: number;
  count?: number;
  desc?: string;
  type?: number;
  targetUrl?: string;
}

// 推荐
export interface IRecommend {
  id: number;
  picStr?: string;
  title?: string;
}

export interface IDigital {
  digitalIcon: string;
  name: string;
  desc: string;
  buyNow: string;
  picStr: string;
  picStr2: string;
  picStr1: string;
}

export interface IHomeInfo {
  banners?: IBanner[];
  categorys?: ICategory[];
  recommends?: IRecommend[];
  digitalData?: IDigital;
}

export interface IProductItem {
  id: number;
  name?: string;
  type?: number;
  minPrice?: number;
  maxPrice?: number;
  originalCost?: number;
  couponLabelDesc?: string;
  coverUrl?: string;
}

export interface IHotProduct {
  id: number;
  products: IProductItem;
}

export interface IProduct {
  hasMore: boolean;
  count: number;
  hotProduct?: IHotProduct[];
}

export interface IAllProduct {
  count: number;
  allProduct?: IProductItem[];
}

// 获取搜索推荐
export const getSearchSuggestData = () => {
  return hyRequest.get<ResultData<ISearchSuggest>>("/searchsuggest/get");
};

// 获取首页其它信息(轮播图/分类...)
export const getHomeInfoData = () => {
  return hyRequest.get<ResultData<IHomeInfo>>("/home/info");
};

// 获取编辑推荐商品
export const getHotProductV2Data = () => {
  return hyRequest.get<ResultData<IProduct>>("/hotproduct_v2/gets");
};

// 获取所有的热门商品
export const getAllProductData = () => {
  return hyRequest.get<ResultData<IAllProduct>>(
    "/allProduct/gets?limit=60&offset=0"
  );
};
