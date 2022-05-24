import React from "react";
import { KeycloakProvider, PrivateRoute } from "@wf/keycloak-axios-provider";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <KeycloakProvider configUrl={`${process.env.REACT_APP_PUBLIC_PATH as string}keycloak.json`}>
      <BrowserRouter>
        <PrivateRoute>
          <Switch>
            <Route exact path={"/"} component={Home} />
          </Switch>
        </PrivateRoute>
      </BrowserRouter>
    </KeycloakProvider>
  );
};

export default App;
