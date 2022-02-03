<template>
  <div class="dialog">
    <div class="back"></div>
    <div class="editPost">
      <div class="inputWithError">
        <input
          type="text"
          placeholder="Замените текст задания"
          class="editInput"
          v-model="title"
        />
        <p v-if="error" style="color: red">Введите что-нибудь</p>
      </div>

      <button class="done" @click="editTodo()">Готово</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      error: false,
    };
  },
  methods: {
    editTodo() {
      const input = document.querySelector(".editInput");
      if (this.title.trim() === "") {
        input.style.border = "1px solid red";
        this.error = true;
      } else {
        this.$emit("editTodo", { title: this.title, visible: false });
        input.style.border = "1px solid silver";
        this.title = "";
        this.error = false;
      }
    },
  },
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.editPost {
  width: 650px;
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
}

.inputWithError {
  display: flex;
  flex-direction: column;
}

.inputWithError input {
  height: 25px;
  border-radius: 8px;
  padding: 10px;
}

.inputWithError p {
  margin: 0;
  text-align: center;
}

button {
  margin-top: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
