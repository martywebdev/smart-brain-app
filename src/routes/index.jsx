import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Root from "./Root";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/auth/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <App />
                    },
                ]
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: '/sign-in',
                        element: <SignIn />
                    }
                ]
                
            }
        ]

    }
])
