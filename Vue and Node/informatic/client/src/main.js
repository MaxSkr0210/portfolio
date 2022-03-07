import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import VueScrollTo from "vue-scrollto";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(VueScrollTo, {
  container: "body",
  duration: 800,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
