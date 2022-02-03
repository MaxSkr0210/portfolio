import Vue from "vue";
import Vuex from "vuex";
const { nanoid } = require("nanoid");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    users: [],
    user: {},
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
    updateTodos(state, todos) {
      state.todos = todos.filter((todo) => todo.user_id === state.user.id);
    },
    loginUser(state, user) {
      state.user = user;
    },
    addUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    getUsers({ commit }) {
      const users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        commit("updateUsers", users);
      } else {
        commit("updateUsers", []);
      }
    },
    getTodos({ commit }) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      if (todos) {
        commit("updateTodos", todos);
      } else {
        commit("updateTodos", []);
      }
    },
    addUser({ commit }, user) {
      let users = [];
      user.id = nanoid();

      if (!localStorage.getItem("users")) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        users = JSON.parse(localStorage.getItem("users"));
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      }
      commit("updateUsers", users);
      commit("addUser", user);
    },
    loginUser({ commit, state }, user) {
      const users = JSON.parse(localStorage.getItem("users"));
      const todos = JSON.parse(localStorage.getItem("todos"));

      for (let i = 0; i < users.length; i++) {
        if (
          users[i].login === user.login &&
          users[i].password === user.password
        ) {
          commit("loginUser", users[i]);
          commit("updateTodos", todos);
          break;
        } else {
          state.user = {};
        }
      }
    },
    findUser({ commit }, id) {
      const users = JSON.parse(localStorage.getItem("users"));
      const todos = JSON.parse(localStorage.getItem("todos"));
      const user = users.filter((user) => user.id === id);
      commit("loginUser", user[0]);
      commit("updateTodos", todos);
    },
    addTodo({ commit }, todo) {
      let todos = [];
      todo.id = nanoid();

      if (!localStorage.getItem("todos")) {
        todos.unshift(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.unshift(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      commit("updateTodos", todos);
    },
    editTodo({ commit }, data) {
      const todos = JSON.parse(localStorage.getItem("todos"));

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === data.id) {
          todos[i].title = data.title;
        }
      }

      localStorage.setItem("todos", JSON.stringify(todos));

      commit("updateTodos", todos);
    },
    deleteTodo({ commit }, id) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      localStorage.setItem(
        "todos",
        JSON.stringify(todos.filter((post) => post.id !== id))
      );

      commit(
        "updateTodos",
        todos.filter((post) => post.id !== id)
      );
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
  },
});
