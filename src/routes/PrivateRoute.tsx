import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {ReactNode} from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
