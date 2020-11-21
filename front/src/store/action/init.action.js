import UIStore from "../UIStore";
import history from "../../service/history.service";
import { toast } from "react-toastify";
import axios from "axios";

export function initApp() {
  let userData = localStorage.getItem("userData");

  if (userData) {
    userData = JSON.parse(userData);
    this.verifyUser(userData.token, userData.email)
      .then(() => {
        this.user = userData;
        axios.defaults.headers.common["token"] = this.user.token;
        try {
          this.initDashboard();
        } catch (e) {
          console.error(e);
          toast.error("Erreur lors du chargement de l'application");
          history.push("/");
          return;
        }
        this.appReady = true;
      })
      .catch((e) => {
        console.error(e);
        localStorage.removeItem("userData");
        history.push("/auth/login");
        this.appReady = true;
      });
  } else this.appReady = true;
}

export async function initDashboard() {
  if (this.user.role == "enterprise") history.push("/admin/index");
  else history.push("/");
  this.appReady = true;
}
