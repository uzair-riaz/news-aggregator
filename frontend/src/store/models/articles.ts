import { Get } from "@/axios";
import { Models, createModel } from "@rematch/core";

export const articles = createModel<Models<any>>()({
  state: {},
  reducers: {},
  effects: () => ({
    async getArticles(filters: Record<string, any>) {
      const params = new URLSearchParams();

      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== null) {
          params.append(key, filters[key]);
        }
      }
      const response = await Get(`articles?${params.toString()}`);
      return response;
    },
  }),
});
