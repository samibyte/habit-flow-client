import { use } from "react";
import AuthContext from "../contexts/auth/AuthContext";

const useAuth = () => use(AuthContext);

export default useAuth;
