import hyRequest from "./index";
import type { ResultData } from "./index";

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
export interface IDetailProduct {
  id: number;
  webPic: string;
  mobilePic: string;
  productNum?: number;
  products?: IProductItem[];
}

// 获取详情数据
export const getProductDetailData = (id: string) => {
  return hyRequest.get<ResultData<IDetailProduct>>(
    `/special/getdetail?specialTopicId=${id}`
  );
};
