import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboad/Dashboard";
import Map from "./pages/Map/Map";



const App = () => {
 
  const router = createBrowserRouter([
    {path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Dashboard/>
        },
        {
          path:'/map',
          element:<Map/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  );
};

export default App;
