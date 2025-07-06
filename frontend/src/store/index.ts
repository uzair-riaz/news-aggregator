// @filename: store.ts
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import persistPlugin from "@rematch/persist";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import storage from "redux-persist/lib/storage";
import { models, RootModel } from "./models";

type FullModel = ExtraModelsFromLoading<RootModel>;

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export const store = init<RootModel, FullModel>({
  models,
  plugins: [persistPlugin(persistConfig), loadingPlugin()],
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
