import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { LoginDTO, loginValidations } from "@/validations/login.dto";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: any) => state.loading.effects.auth.login);

  const handleSubmit = async (values: LoginDTO) => {
    const response = await dispatch.auth.login(values);

    if (response?.status === "success") {
      dispatch.notify.success({ msg: "Login Successfull !" });
      const user = response?.data?.user?.preferences;
      !user ? navigate("/user-preferences") : navigate("/articles");
    }
  };

  return (
    <div className="mt-5">
      <Card className="mx-auto max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
            {process.env.VITE_APP_NAME}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik<LoginDTO>
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidations}
            onSubmit={handleSubmit}
          >
            {({}) => (
              <Form>
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      className="w-full"
                      as={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="w-full"
                      as={Input}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  {/* Sign-Up Link */}
                  <div className="text-center mt-4">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-blue-500 underline">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
