import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import User from "./getUser/User";
import AddUser from "./addUser/AddUser";
import UpdateUser from "./updateUser/UpdateUser";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },{
      path:'/update/:id',
      element: <UpdateUser/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
