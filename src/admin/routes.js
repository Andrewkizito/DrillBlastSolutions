import Dashboard from "./blast/views/Dashboard/Dashboard.js";
import ManageHome from "./blast/views/ManageHome";
import ManageExplorer from "./blast/views/ManageExplorer";

// @material-ui/icons
import { HomeOutlined, Search, Dashboard } from "@material-ui/icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/manage-home",
    name: "Manage Home Page",
    icon: HomeOutlined,
    component: ManageHome,
    layout: "/admin"
  },
  {
    path: "/manage-explorer",
    name: "Manage Explorer",
    icon: Search,
    component: ManageExplorer,
    layout: "/admin"
  }
];
export default dashRoutes;
