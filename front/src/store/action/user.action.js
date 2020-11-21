import axios from "axios";
import UIStore from "../UIStore";
import { toast } from "react-toastify";
import history from "../../service/history.service";

export function register(
  firstName,
  lastName,
  email,
  pass,
  isEnterprise,
  entrepriseName
) {
  return new Promise((resolve, reject) => {
    let promise = axios.post("/user/register", {
      firstName,
      lastName,
      email,
      pass,
      isEnterprise,
      entrepriseName,
    });

    promise.then(async (res) => {
      await UIStore.login(email, pass, true);
      return resolve(res.data);
    });
    promise.catch((err) => {
      return reject({ status: err.response.status, data: err.response.data });
    });
  });
}

export function login(email, pass, remember) {
  return new Promise((resolve, reject) => {
    let promise = axios.post("/user/login", { email, pass });

    promise.then(async (res) => {
      UIStore.user = res.data;
      axios.defaults.headers.common["token"] = UIStore.user.token;
      try {
        await UIStore.initDashboard();
      } catch {
        toast.error("Erreur lors du chargement de l'application");
        history.push("/");
        return;
      }
      if (remember)
        localStorage.setItem("userData", JSON.stringify(UIStore.user));
      return resolve();
    });
    promise.catch((err) => {
      return reject({ status: err.response ? err.response.status : 500 });
    });
  });
}

export function logout(redirect = true) {
  UIStore.user = UIStore.defaultUser;
  localStorage.removeItem("userData");
  if (redirect) history.push("/auth/login");
}

export async function verifyUser(token, email) {
  return new Promise((resolve, reject) => {
    let promise = axios.post("/user/verify", { token, email });
    promise.then((res) => {
      return resolve(true);
    });
    promise.catch((err) => {
      return reject({ status: err.response ? err.response.status : 500 });
    });
  });
}
