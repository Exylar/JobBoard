import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainNavbar from "components/Navbars/MainNavbar.js";
import MainFooter from "components/Footers/MainFooter.js";
import UIStore from "../store/UIStore";
import routes from "routes.js";
import { observer } from "mobx-react";

@observer
class Main extends React.Component {
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          <MainNavbar store={UIStore} />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/" />
          </Switch>
        </div>
        <MainFooter />
      </>
    );
  }
}

export default Main;
