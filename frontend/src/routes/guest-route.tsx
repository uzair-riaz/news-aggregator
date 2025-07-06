import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface GuestRouteProps {
  children: JSX.Element;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/user-preferences" />;
  }

  return children;
};

export default GuestRoute;
