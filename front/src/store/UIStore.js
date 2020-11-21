import { observable, action, decorate, autorun, computed } from "mobx";
import * as initActions from "./action/init.action";
import * as userActions from "./action/user.action";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

class UIStore {
  constructor() {
    //makeObservable(this, {
    //  appReady: observable,
    //  user: observable,
    //});
  }
  //-------------------------- CONFIG -------------------------------//
  config = {
    BACK_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:1337/"
        : "http://ganster-dev.fr:1337",
  };
  defaultUser = {
    id: null,
    firstName: null,
    lastName: null,
    mail: null,
    token: null,
    role: null,
  };

  //-------------------------- Init -------------------------------//

  @observable appReady = false;
  @action initApp = initActions.initApp;
  @action initDashboard = initActions.initDashboard;

  //-------------------------- USER -------------------------------//
  @observable user = this.defaultUser;

  @action register = userActions.register;
  @action login = userActions.login;
  @action logout = userActions.logout;
  @action verifyUser = userActions.verifyUser;

  header = null;
}

export default new UIStore();
