import type { CategoryPostRequest } from "./category-post-type";

export type CategoryPutRequest = {
  id: number | undefined;
  data: CategoryPostRequest;
};
