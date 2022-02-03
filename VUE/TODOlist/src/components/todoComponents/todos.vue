<template>
  <div class="todosEl">
    <div class="el">
      <div class="text">{{ todo.title }}</div>
      <div class="buttons">
        <button class="edit" @click="reWriteTodo()">Редактировать</button>
        <button class="done" @click="doneTodo(i)">Выполненно</button>
      </div>
    </div>
    <hr :class="{ visible: done, unvisible: !done, animate: done }" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      done: false,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
    i: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteTodo"]),
    reWriteTodo() {
      this.$emit("visibleDialog", { todo: this.todo, visible: true });
    },
    doneTodo(i) {
      this.done = true;
      const hr = document.querySelectorAll("hr")[i];
      hr.classList.add("animate");
      setInterval(() => {
        this.deleteTodo(this.todo.id);
      }, 950);
    },
  },
};
</script>

<style scoped>
.todosEl {
  padding: 0 15px;
  position: relative;
}

.el {
  border: 1px solid green;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 25px;
  margin-top: 20px;
}

.text {
  display: flex;
  align-items: center;
  flex: 20;
}

.buttons {
  flex: 1 330px;
}

button:first-child {
  margin-right: 15px;
}

hr {
  width: 0px;
  border: 1px solid silver;
  position: absolute;
  bottom: 36px;
  left: 0px;
}

.animate {
  animation-duration: 1s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>
