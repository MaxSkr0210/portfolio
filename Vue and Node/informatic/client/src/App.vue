<template>
  <div id="app">
    <nav id="nav">
      <div class="mid nav-midm">
        <div class="logo">
          <h1>
            <router-link to="/"><i>#</i>Info-history</router-link>
          </h1>
        </div>
      </div>
    </nav>
    <transition name="toPage"> <router-view /></transition>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  height: 93.56%;
}

#app {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 1.2em;
  background: fixed url("../public/bc.jpg") repeat-y;
  background-size: 100%;
  height: 100%;
  width: 100%;
  font-family: "Ubuntu", sans-serif;
}

body h1 {
  margin: 0;
  font-size: 2.8em;
}

body h2 {
  margin: 0;
  font-size: 1.8em;
}

body h3 {
  margin: 0;
  font-size: 1.46667em;
}

body h4 {
  margin: 0;
  font-size: 1.3em;
}

body h5 {
  margin: 0;
  font-size: 1.2em;
}

.router-link-active {
  color: #fff;
}

a {
  text-decoration: none;
  color: #333;
}

a,
button,
input {
  outline: none;
  border: none;
}

button {
  cursor: pointer;
}

.mid {
  width: 84%;
  margin: 0 auto;
  position: relative;
}

.btn {
  border: none;
}

hr {
  border: none;
  background: #0d6efd;
  height: 2px;
}

nav,
footer {
  background-color: #0d6efd;
  color: #fff;
  height: 62px;
  position: relative;
}

footer {
  display: flex;
  align-items: center;
}

footer .mid {
  text-align: center;
}

nav .mid,
nav .mid .btn {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.nav-midm {
  display: flex;
  align-items: center;
}

.nav-mid .adminBtn {
  display: flex;
  align-items: center;
}

.nav-mid .adminBtn button {
  padding: 5px 15px;
  border-radius: 8px;
  font-size: 1em;
  background: #fff;
  transition: all 500ms ease;
}

.nav-mid .adminBtn button:hover {
  background: #3687ff;
  color: #fff;
}

nav ul,
nav li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.img {
  padding: 10px;
  margin-right: 15px;
  border: 2px solid #0d6efd;
}

.right_img {
  border: 2px solid #0d6efd;
  padding: 10px;
  margin-right: 0;
  margin-left: 15px;
}

p {
  text-indent: 20px;
}

.right {
  margin-right: 0;
  margin-left: 15px;
}

.toPage-enter-active,
.toPage-leave-active {
  transition: all 0.5s ease;
  opacity: 0;
}
.toPage-enter,
.toPage-leave-active {
  transform: translateY(-200px);
  opacity: 0;
}

@media screen and (max-width: 1000px) {
  body h1 {
    color: #fff;
    font-size: 2.4em;
  }
}
</style>
