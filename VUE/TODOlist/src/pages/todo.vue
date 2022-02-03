<template>
  <div class="todoPage">
    <nav>
      {{ user.login }}
      <button @click="exit()">Выход</button>
    </nav>
    <h1>Todo List</h1>
    <createTodo></createTodo>
    <todolist :todos="todos"></todolist>
  </div>
</template>

<script>
import todolist from "@/components/todoComponents/todoList.vue";
import createTodo from "@/components/todoComponents/сreatePost.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    todolist,
    createTodo,
  },
  data() {
    return {
      userId: 0,
    };
  },
  computed: {
    ...mapGetters(["todos", "user"]),
  },
  methods: {
    ...mapActions(["findUser"]),
    exit() {
      document.cookie = `id=${this.user.id.replace(
        "id=",
        ""
      )}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      this.$router.push("/");
    },
  },
  async mounted() {
    const user_id = document.cookie;
    const id = user_id.replace("id=", "");
    this.findUser(id);
    if (!user_id) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
button {
  font-size: 16px;
}
</style>
