<template>
  <div class="auth">
    <h2>Авторизация</h2>
    <div class="inputs">
      <input type="text" placeholder="Введите логин" v-model="login" />
      <input type="text" placeholder="Введите пароль" v-model="password" />
    </div>
    <button class="done" @click="auth()">Авторизация</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["users", "user"]),
  },
  methods: {
    ...mapActions(["getUsers", "loginUser"]),
    auth() {
      this.getUsers();
      this.loginUser({ login: this.login, password: this.password });
      if (this.user.id) {
        this.$emit("auth", this.user);
      } else {
        alert("Неправильный ллогин или пароль");
      }
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  margin-bottom: 20px;
}
</style>
