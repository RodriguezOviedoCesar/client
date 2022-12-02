import { Outlet } from "react-router";
import { isAuthenticated } from "../../Services/authService"
import LoginView from "../../views/LoginView";

const AuthRouter = () =>{
  const user = isAuthenticated();
  return user ? <Outlet/>:<LoginView/>;
}

export default AuthRouter;