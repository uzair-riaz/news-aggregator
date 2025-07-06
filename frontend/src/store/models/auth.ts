import { Post } from "@/axios";
import { Models, createModel } from "@rematch/core";

export interface AuthModel {
  state: {
    token: string;
    user: Record<string, unknown>;
  };
  reducers: {
    setToken: (
      state: AuthModel["state"],
      payload: string
    ) => AuthModel["state"];
    setUser: (
      state: AuthModel["state"],
      payload: Record<string, unknown>
    ) => AuthModel["state"];
  };
  effects: (dispatch: any) => {
    login: (payload: any) => Promise<any>;
    signup: (payload: any) => Promise<any>;
    logout: (payload: any) => Promise<any>;
  };
}

export const auth = createModel<Models<any>>()({
  state: {
    token: "",
    user: {},
  },
  reducers: {
    setToken: (state, payload) => ({
      ...state,
      token: payload,
    }),
    setUser: (state, payload) => ({
      ...state,
      user: payload,
    }),
  },
  effects: () => ({
    async login(payload) {
      const response = await Post("login", payload);
      if (response) {
        this.setToken(response.data?.api_token);
        this.setUser(response?.data?.user);
      }
      return response;
    },

    async signup(payload) {
      const response = await Post("register", payload, true);
      return response;
    },
    async logout() {
      window.location.href = "/";
      localStorage.clear();
    },
  }),
});
