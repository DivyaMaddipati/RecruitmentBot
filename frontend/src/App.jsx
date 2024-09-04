import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/u");
  }, []);
  return (
    <>
    <section>
      <Outlet />
    </section>
    </>
  );
}
export default App;
