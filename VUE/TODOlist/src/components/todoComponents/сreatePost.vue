<template>
  <div class="createPost">
    <div class="title">
      <input type="text" placeholder="Введите имя поста" v-model="title" />
    </div>

    <button class="done" @click="addPost({ title, completed: false })">
      Записать дело
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "",
    };
  },

  methods: {
    ...mapActions(["addTodo"]),
    async addPost(data) {
      const user_id = document.cookie;
      const id = user_id.replace("id=", "");
      data.user_id = id;
      if (this.title.trim() === "") {
        alert("Введите текст задания");
      } else {
        this.title = "";
        await this.addTodo(data);
      }
    },
  },
};
</script>

<style scoped>
.createPost {
  width: 450px;
  margin: 0 auto;
}

input {
  margin-top: 20px;
  width: 100%;
}

button {
  margin-top: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
