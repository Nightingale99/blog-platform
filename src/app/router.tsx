import { Layout } from "@/pages/Layout";
import { PostsPage } from "@/pages/PostsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
    ],
  },
]);
