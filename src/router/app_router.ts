import Layout from "../../src/layouts/full/FullLayout.vue"
import Login from "@/views/Auth/Login/Login.vue";
import Logout from "@/views/Auth/Logout/Logout.vue"
import HomePage from "@/views/HomePage.vue";
import NotFound from "@/views/404.vue"
import Customers from "@/views/CustomerInfo/pages/CustomerBasicInfo.vue"
import ModuleHomePage from "@/views/ModuleHomePage.vue";
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  
  {
   
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/Logout",
    name: "Logout",
    component: Logout,
    meta: {
      requiresAuth: true, // all children will need authentication too
    },
  },
  {
    path: "/home",
    name: "Home Page",
    component: Layout,
    meta: {
      requiresVisitor: true,
    },
    children: [
      {
        path: "/HomePage",
        name: "home",
        components: {
          content: HomePage,
        },
      },
      {
        path: "/customers",
        name: "customers",
        component: Customers
      }
    ]
  },
  
  {
    name: "layout",
    path: "/",
    component: Layout,
    meta: {
      requiresAuth: true, // all children will need authentication too
    },
    redirect: {
      path: "home",
    },
    children: [
      {
        name: "Home Page",
        path: "/home",
        component: HomePage,
      },
      {
        path: "/customers",
        name: "customers",
        component: Customers
      },
      {
        name: "Module Home Page",
        path: "home/:requestData",
        component: ModuleHomePage,
      },


    ],
  },
  {
    name: "NotFound",
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: {
      requiresAuth: true, 
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

let count = 0;
const firstPathList: Array<any> = JSON.parse(sessionStorage.getItem("RoutingPage") as any)

let pages: any = [];
if (firstPathList != null) {

  firstPathList.forEach((e: any) => {
    let routObj = {
      id: "",
      name: "",
      path: "",
      parentPath: "",
      component: {},
      metaTag: true,
      children: [],
      targetPath: ""

    }
    let pathName = e.TargetPath.split("/");
    let ComName = pathName[pathName.length - 1]
    let parentCom = pathName[pathName.length - 2]
    routObj.id = e.FastPath,
      routObj.name = ComName
    routObj.path = "/" + ComName
    routObj.parentPath = parentCom
    routObj.targetPath = e.TargetPath;
    pages.push(routObj)
  });
 
  pages.forEach((page: any) => {
    count++;
    let r = page.targetPath;
    router.addRoute(
      {
        name: count + page.parentPath,
        path: '/' + page.parentPath,
        component: Layout,
        meta: page.metaTag,
        children: [{
          path: page.path,
          name: page.name,
          component: () => import(`../${r}.vue`),
        },
        {
          name: "NotFound",
          path: "/:catchAll(.*)",
          component: NotFound,
          meta: {
            requiresAuth: true, // all children will need authentication too
          }
        },]
      }
    );

  });
}
router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes("Importing a module script failed")) {
    router.push('NotFound');
  }
})
export default router
