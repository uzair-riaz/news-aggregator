import { createModel } from "@rematch/core";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { RootModel } from ".";

export const notify = createModel<RootModel>()({
  state: {},
  reducers: {},
  effects: {
    success({ msg }) {
      enqueueSnackbar(msg, {
        variant: "success",
        onClose: () => closeSnackbar(),
      });
    },
    error({ msg }) {
      enqueueSnackbar(msg, { variant: "error" });
    },
    warn({ msg }) {
      enqueueSnackbar(msg, { variant: "warning" });
    },
    info({ msg }) {
      enqueueSnackbar(msg, { variant: "info" });
    },
  },
});
