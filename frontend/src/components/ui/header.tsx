import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch.auth.logout();
    navigate("/");
  };

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Website Title */}
          <h1 className="text-2xl font-bold">News Aggregator</h1>

          <div className="space-x-7 flex items-center">
            {token ? (
              <>
                <Link to="/articles">Articles</Link>
                <Link to="/user-preferences">Preferences</Link>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
