import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";
import MovieDetails from "./pages/moviedetails";
import SearchPage from "./pages/searchpage";



function App() {
  const router = createBrowserRouter([
    {
      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        {path: "/moviedetails/:id", element: <MovieDetails /> },
        { path:"/search", element:<SearchPage />}
       
      
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
