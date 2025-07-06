import { createBrowserRouter } from "react-router-dom";

import Articles from "@/pages/articles";
import Login from "@/pages/login";
import SignUp from "@/pages/register";
import UserPreferences from "@/pages/user-preferences";
import GuestRoute from "./guest-route";
import ProtectedRoute from "./protected-route";
import { ROUTES } from "./constants";
import Layout from "@/components/layout/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: ROUTES.SIGNUP,
        element: (
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        ),
      },
      {
        path: ROUTES.ARTICLES,
        element: (
          <ProtectedRoute>
            <Articles />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.USER_PREFERENCES,
        element: (
          <ProtectedRoute>
            <UserPreferences />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
