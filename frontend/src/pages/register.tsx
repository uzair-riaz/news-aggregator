import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterDTO, registerValidations } from "@/validations/register.dto";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(
    (state: any) => state.loading.effects.auth.signup
  );

  const handleSubmit = async (values: RegisterDTO) => {
    const response = await dispatch.auth.signup(values);
    if (response?.status === "success") {
      dispatch.notify.success({ msg: "Registration successful !" });
      navigate("/");
    }
  };

  return (
    <div className="mt-5">
      <Card className="mx-auto max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Sign Up To access your all newsletters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik<RegisterDTO>
            initialValues={{
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={registerValidations}
            onSubmit={handleSubmit}
          >
            {({}) => (
              <Form>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="w-full"
                      as={Input}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

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

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>
                    <Field
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      className="w-full"
                      as={Input}
                    />
                    <ErrorMessage
                      name="password_confirmation"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                  </Button>

                  {/* Sign-In Link */}
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <Link to="/" className="text-blue-500 underline">
                        Sign In
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
