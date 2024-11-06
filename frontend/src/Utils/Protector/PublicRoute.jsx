import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {

  const isAuthenticated = useSelector(state => state.auth.token)
  console.log(isAuthenticated)
  if (isAuthenticated) {

    return <Navigate to={'/'}/>
  }
  return children
}

export default PublicRoute