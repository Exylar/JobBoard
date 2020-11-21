import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import UIStore from "./store/UIStore";
import axios from "axios";
import history from "./service/history.service";

import "assets/plugins/nucleo/css/nucleo.css";
import "react-toastify/dist/ReactToastify.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/argon-design-system-react.scss";

import MainLayout from "layouts/Main.js";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { observer } from "mobx-react";

axios.defaults.baseURL = UIStore.config.BACK_URL;
axios.defaults.headers.common["token"] = null;

UIStore.initApp();
window.UIStore = UIStore;

@observer
class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        {this.props.store.appReady ? (
          <Router history={history}>
            <Switch>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />
              <Route path="/" render={(props) => <MainLayout {...props} />} />
              <Redirect from="/" to="/" />
            </Switch>
          </Router>
        ) : (
          <div onClick={this.props.store.toggle}>Loading please wait ...</div>
        )}
      </>
    );
  }
}

ReactDOM.render(<App store={UIStore} />, document.getElementById("root"));
