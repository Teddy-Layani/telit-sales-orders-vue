import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/index.vue"),
      },

      {
        path: "item/:id",
        name: "item",
        props: true,
        component: () =>
          import(/* webpackChunkName: "ItemPage" */ "@/pages/ItemPage.vue"),
      },
      {
        path: "new-order",
        name: "new-order",
        component: () =>
          import(/* webpackChunkName: "NewOrder" */ "@/pages/NewOrderPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL), // you can use without hash as well by using the createWebHistory function
  routes,
});

export default router;
