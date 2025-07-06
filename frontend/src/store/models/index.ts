import { Models } from "@rematch/core";
import { auth, AuthModel } from "./auth";
import { notify } from "./notify";
import { userPreferences } from "./user-preferences";
import { articles } from "./articles";

export interface RootModel extends Models<RootModel> {
  notify: typeof notify;
  auth: AuthModel;
  userPreferences: typeof userPreferences;
  articles: typeof articles;
}

export const models: RootModel = {
  auth,
  notify,
  userPreferences,
  articles,
};
