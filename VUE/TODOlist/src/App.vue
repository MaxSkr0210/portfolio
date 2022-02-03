<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
body,
input,
button,
select {
  font-family: "Times New Roman";
  font-size: 20px;
}

input,
button,
select {
  outline: none;
}

h1 {
  text-align: center;
}

button {
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  transition: all 0.6s ease;
}

.edit {
  border: 2px solid orange;
}
.done {
  border: 2px solid green;
}

.edit:hover {
  background-color: orange;
  color: #fff;
}

.done:hover {
  background-color: green;
  color: #fff;
}

input {
  height: 25px;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid silver;
}

.visible {
  display: flex;
}

.unvisible {
  display: none;
}
</style>
