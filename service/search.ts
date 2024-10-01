import hyRequest from "./index";

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

export interface ISearchProductResult {
  code: number;
  more: boolean;
  products?: IProductItem[];
}

export interface ISearchParam {
  limit: number;
  offset: number;
  q: string;
}

// 获取搜索数据
export const getProductSearchData = (params: ISearchParam) => {
  return hyRequest.post<ISearchProductResult>(
    `/store/api/product/search`,
    params,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  );
};
