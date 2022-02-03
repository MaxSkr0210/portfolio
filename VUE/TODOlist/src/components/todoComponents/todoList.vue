<template>
  <div class="list">
    <todos
      v-for="(todo, i) in todos"
      :key="todo.id"
      :todo="todo"
      :i="i"
      @visibleDialog="dialog"
    ></todos>
    <editTodo
      :class="{ visible: edit, unvisible: !edit }"
      @editTodo="reWriteTodo"
    ></editTodo>
  </div>
</template>

<script>
import todos from "@/components/todoComponents/todos.vue";
import editTodo from "@/components/todoComponents/editTodo.vue";
import { mapActions } from "vuex";

export default {
  components: {
    todos,
    editTodo,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      edit: false,
      todo: {},
    };
  },
  methods: {
    ...mapActions(["editTodo"]),
    async reWriteTodo(data) {
      await this.editTodo({ title: data.title, id: this.todo.id });
      this.edit = data.visible;
    },
    dialog(data) {
      this.edit = data.visible;
      this.todo = data.todo;
    },
  },
};
</script>

<style scoped>
.list {
  width: 1000px;
  margin: 0 auto;
}
</style>
