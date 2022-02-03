<template>
  <div class="reg">
    <h2>Регистрация</h2>
    <div class="inputs">
      <input type="text" placeholder="Введите логин" v-model="login" />
      <input type="text" placeholder="Введите пароль" v-model="password" />
    </div>
    <button class="done" @click="pushToTodo">Регистрация</button>
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
    ...mapActions(["addUser", "getUsers"]),
    pushToTodo() {
      this.getUsers();

      if (this.password.trim() === "") {
        alert("Создайте пароль");
      } else {
        const user = this.users.filter((u) => u.login === this.login);
        if (user.length > 0) {
          alert("Пользователь с таким именем уже существует");
        } else {
          this.addUser({ login: this.login, password: this.password });
          this.$emit("gotoTodo", this.user);
        }
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
