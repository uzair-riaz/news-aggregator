import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, token } = useSelector((state: any) => state.auth);

  return {
    token,
    user,
  };
};
