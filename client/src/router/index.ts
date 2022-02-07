import AuthPage from "../pages/Auth/AuthPage";
import ChatPage from "../pages/Chat/ChatPage";

export const authRoutes = [
  {
    path: "/chat",
    component: ChatPage,
  },
];

export const routes = [
  {
    path: "/login",
    component: AuthPage,
  },
  {
    path: "/registration",
    component: AuthPage,
  },
];
