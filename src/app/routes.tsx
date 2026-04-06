import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Programme } from "./pages/Programme";
import { Galerie } from "./pages/Galerie";
import { ListeInvites } from "./pages/ListeInvites";
import { Blog } from "./pages/Blog";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminPosts } from "./pages/admin/Posts";
import { AdminGalerie } from "./pages/admin/Galerie";
import { AdminInvites } from "./pages/admin/Invites";
import { AdminCards } from "./pages/admin/Cards";
import { AdminProgramme } from "./pages/admin/Programme";
import { RootLayout } from "./components/RootLayout";
import { AdminLayout } from "./components/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "programme", Component: Programme },
      { path: "galerie", Component: Galerie },
      { path: "invites", Component: ListeInvites },
      { path: "blog", Component: Blog },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "posts", Component: AdminPosts },
      { path: "galerie", Component: AdminGalerie },
      { path: "invites", Component: AdminInvites },
      { path: "cards", Component: AdminCards },
      { path: "programme", Component: AdminProgramme },
    ],
  },
]);
