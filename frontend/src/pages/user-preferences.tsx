"use client";

import { MultiSelect } from "@/components/core/multi-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { preferencesSchema } from "@/validations/preferences";
import { authorOptions, categoryOptions, sourceOptions } from "@/constants";
import { useNavigate } from "react-router-dom";

export default function UserPreferences() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email,
      name: user?.name,
      preferences: {
        sources: user?.preferences?.preferences?.sources || [],
        categories: user?.preferences?.preferences?.categories || [],
        authors: user?.preferences?.preferences?.authors || [],
      },
    },
    validationSchema: preferencesSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const response = await dispatch.userPreferences.savePreferences(values);
      if (response) {
        dispatch.notify.success({ msg: "Preferences Saved !" });
        navigate("/articles");
      }
    },
  });

  const handleMultiSelect = (
    value: string,
    currentState: string[],
    setter: (field: string, value: any) => void,
    field: string
  ) => {
    if (currentState.includes(value)) {
      setter(
        field,
        currentState.filter((item) => item !== value)
      );
    } else {
      setter(field, [...currentState, value]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>
            Manage your account settings and set your news preferences
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-destructive text-sm">
                  {formik.errors?.email?.toString()}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && (
                <p className="text-destructive text-sm">
                  {formik.errors.name?.toString()}
                </p>
              )}
            </div>
            <MultiSelect
              options={sourceOptions}
              selected={formik.values.preferences.sources}
              setSelected={formik.setFieldValue}
              label="Sources"
              fieldName="preferences.sources"
              handleMultiSelect={handleMultiSelect}
            />
            <MultiSelect
              options={categoryOptions}
              selected={formik.values.preferences.categories}
              setSelected={formik.setFieldValue}
              label="Categories"
              fieldName="preferences.categories"
              handleMultiSelect={handleMultiSelect}
            />
            <MultiSelect
              options={authorOptions}
              selected={formik.values.preferences.authors}
              setSelected={formik.setFieldValue}
              label="Authors"
              fieldName="preferences.authors"
              handleMultiSelect={handleMultiSelect}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
