import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Root from "./Root";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/auth/SignIn";
import ImageLinkForm from "../components/ImageLinkForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ImageLinkForm />
            },
            {
                path: '/sign-in',
                element: <SignIn />
            }
        ]

    }
])
