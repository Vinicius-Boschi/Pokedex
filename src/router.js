import { createRouter, createWebHistory } from "vue-router"
import List from "./components/List.vue"
import Details from "./components/Details.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "List",
      component: List,
    },
    {
      path: "/details/:id",
      name: "Details",
      component: Details,
      props: true,
    },
  ],
})

export default router