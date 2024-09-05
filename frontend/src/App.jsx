import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Progress from "./components/Progress";
import { UserProgressProvider } from "./contexts/userProgressContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/u");
    }
  }, [location, navigate]);

  return (
    <UserProgressProvider>
      <div style={{ paddingTop: '80px' }}> {/* Adjust this value based on header height */}
        {location.pathname !== "/a" && <Progress />}
        <Outlet />
      </div>
    </UserProgressProvider>
  );
}

export default App;
