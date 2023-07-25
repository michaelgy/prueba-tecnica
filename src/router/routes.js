const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
        meta: { name: "Inicio" },
      },
      {
        path: "athletes",
        component: () => import("pages/AthletesPage.vue"),
        meta: { name: "Atletas" },
      },
      {
        path: "competition",
        component: () => import("pages/CompetitionDataPage.vue"),
        meta: { name: "Registro competencia" },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
