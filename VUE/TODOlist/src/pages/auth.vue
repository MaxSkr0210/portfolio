<template>
  <div class="authPage">
    <reg @gotoTodo="goTodo"></reg>
    <auth @auth="goTodo"></auth>
  </div>
</template>

<script>
import reg from "@/components/authComponents/reg.vue";
import auth from "@/components/authComponents/auth.vue";

export default {
  components: {
    reg,
    auth,
  },
  methods: {
    goTodo(data) {
      document.cookie = `id=${data.id}`;
      this.$router.push("/todo");
    },
  },
  mounted() {
    if (document.cookie.replace("id=", "")) {
      this.$router.push("/todo");
    }
  },
};
</script>

<style scoped>
.authPage {
  width: 1000px;
  margin: 0 auto;
}
</style>
