import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Progress from "./components/Progress";
import { UserProgressProvider } from "./contexts/userProgressContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/u");
    }
  }, []);
  return (
    <UserProgressProvider>
      <section>
        {location.pathname !== "/a" && <Progress />}

        <Outlet />
      </section>
    </UserProgressProvider>
  );
}
export default App;
