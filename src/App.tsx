import React from "react";
import { KeycloakProvider, PrivateRoute } from "@wf/keycloak-axios-provider";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Pay from "./components/Pay";
import Result from "./components/Result";
import Mobile from "./components/Mobile";

const App: React.FC = () => {
  return (
    <KeycloakProvider configUrl={`${process.env.REACT_APP_PUBLIC_PATH as string}keycloak.json`}>
      <BrowserRouter>
        <PrivateRoute>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/pay"} component={Pay} />
            <Route exact path={"/result"} component={Result} />
            <Route exact path={"/mobile"} component={Mobile} />
          </Switch>
        </PrivateRoute>
      </BrowserRouter>
    </KeycloakProvider>
  );
};

export default App;
