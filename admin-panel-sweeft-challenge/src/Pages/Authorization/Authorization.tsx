import SignInOrSignUp from "./components/SignInOrSignUp";
import { useAuthorizationContext } from "../../Contexts/AuthorizationContext";

const Authorization = () => {
  const { loggedin } = useAuthorizationContext();
  return <div>{!loggedin && <SignInOrSignUp />}</div>;
};

export default Authorization;
