import { Redirect, Route, Switch } from "react-router-dom";

import Cookies from "js-cookie";
import { authRoutes, routes } from "../router";

const AppRouter = () => {
  return (
    <Switch>
      {Cookies.get("token") &&
        authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}
      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRouter;
