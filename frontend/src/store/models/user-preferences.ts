import { Get, Put } from "@/axios";
import { Models, createModel } from "@rematch/core";

export const userPreferences = createModel<Models<any>>()({
  state: {},
  reducers: {},
  effects: (dispatch) => ({
    async getPreferences() {
      const response = await Get("preferences");
      return response;
    },

    async savePreferences(payload) {
      const response = await Put("preferences", payload, true);
      if (response && response.user) {
        dispatch.auth.setUser(response?.user);
      }
      return response;
    },
  }),
});
