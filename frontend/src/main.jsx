import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserDashboard, AdminDashboard, MCQs, CodingRound } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "u",
        children: [
          { path: "", element: <UserDashboard /> },
          {
            path: "test",
            element: <MCQs />,
          },
          { path: "code", element: <CodingRound /> },
        ],
      },
      {
        path: "a",
        element: <AdminDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
