// Main
import Index from "views/main/Index.js";
import Job from "views/main/Job.js";
import Advert from "views/main/Advert.js";
import Profil from "views/main/Profil.js";

// Admin
import Admin from "views/admin/Admin.js";

import ListJobs from "views/admin/Jobs/ListJobs.js";
import FormJobs from "views/admin/Jobs/AddJobs.js";
import ModifieJobs from "views/admin/Jobs/ModifieJobs.js";

import ListApplications from "views/admin/Applications/ListApplications.js";
import Profile from "views/admin/Profile.js";
import MyProfile from "views/admin/MyProfile.js";
import CompanyProfile from "views/admin/CompanyProfile.js";

// Auth
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";

var routes = [
  {
    path: "/",
    name: "Accueil",
    component: Index,
    layout: "/",
  },
  {
    path: "job",
    name: "Job",
    component: Job,
    layout: "/",
  },
  {
    path: "ad/:id",
    name: "Annonce",
    component: Advert,
    layout: "/",
  },
  {
    path: "profil",
    name: "Profil",
    component: Profil,
    layout: "/",
  },
  {
    path: "/index",
    name: "Menu d'administation",
    component: Admin,
    layout: "/admin",
  },

  {
    path: "/list",
    name: "Liste des jobs",
    component: ListJobs,
    layout: "/admin",
  },
  {
    path: "/form",
    name: "Ajouter un job",
    component: FormJobs,
    layout: "/admin",
  },
  {
    path: "/modifier/:id",
    name: "Modifier un job",
    component: ModifieJobs,
    layout: "/admin",
  },

  {
    path: "/list_applications",
    name: "Listes des applications",
    component: ListApplications,
    layout: "/admin",
  },

  {
    path: "/profile/:id",
    name: "Profil utilisateur",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Mon profil",
    component: MyProfile,
    layout: "/admin",
  },
  {
    path: "/company_profile",
    name: "Profil d'entreprise",
    component: CompanyProfile,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Connexion",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Inscription",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
