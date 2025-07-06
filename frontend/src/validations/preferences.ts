import * as Yup from "yup";

export const preferencesSchema = Yup.object({
  email: Yup.string().email("Invalid email").nullable(),
  name: Yup.string().nullable(),
  preferences: Yup.object({
    sources: Yup.array()
      .of(Yup.string())
      .min(1, "At least one source is required"),
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "At least one category is required"),
    authors: Yup.array()
      .of(Yup.string())
      .min(1, "At least one author is required"),
  }).required("Preferences are required"),
});
