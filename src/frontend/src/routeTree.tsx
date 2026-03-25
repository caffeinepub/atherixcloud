import {
  Outlet,
  createRootRoute,
  createRoute,
  type createRouter,
} from "@tanstack/react-router";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import LandingPage from "./pages/LandingPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboard,
});

export const routeTree = rootRoute.addChildren([
  landingRoute,
  adminRoute,
  adminDashboardRoute,
]);

export type AppRouter = ReturnType<typeof createRouter<typeof routeTree>>;
