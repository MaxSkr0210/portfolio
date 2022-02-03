import VueRouter from "vue-router";
import auth from "../pages/auth.vue";
import todo from "../pages/todo.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: auth,
    },
    {
      path: "/todo",
      component: todo,
    },
  ],
});
