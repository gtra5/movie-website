import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";



function App() {
  const router = createBrowserRouter([
    {
      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
       
      
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
