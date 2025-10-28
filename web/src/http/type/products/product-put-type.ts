import type { ProductPostRequest } from "./products-post-type";

export type ProductPutRequest = {
  id: number | undefined;
  data: ProductPostRequest;
};
