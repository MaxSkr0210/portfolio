<template>
  <div class="admin">
    <div class="adminPanel" v-if="hide === false">
      <div class="panel">
        <div class="return">
          <svg
            enable-background="new 0 0 32 32"
            height="55px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="64px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            @click="returnToMainPage"
          >
            <g>
              <line
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="10"
                x1="309.6"
                x2="202.4"
                y1="202.4"
                y2="309.6"
              />
              <line
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="10"
                x1="309.6"
                x2="202.4"
                y1="309.6"
                y2="202.4"
              />
            </g>
          </svg>
        </div>
        <h2>Авторизоваться как админ</h2>
        <form @submit.prevent="auth">
          <input type="text" placeholder="Логин" v-model="login" />
          <input type="password" placeholder="Пароль" v-model="password" />
          <div class="button">
            <button>Авторизироваться</button>
          </div>
          <div class="error" v-if="status === 404">
            Неправильный логин или пароль
          </div>
        </form>
      </div>
    </div>
    <div class="mid" v-else-if="hidePage">
      <div class="addPosts">
        <h2>Добавить запись</h2>
        <form>
          <input
            type="text"
            placeholder="Введите заголовок параграфа"
            id="header"
            v-model="header"
          />
          <Editor
            api-key="ue6qgz846qz0ltofkupmx73brc833vypzbqlt0hnnt4jsh5f"
            :init="{
              height: 500,
              menubar: false,
              plugins: [
                'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
              ],
              toolbar:
                'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample code',
            }"
            v-model="text"
          />
          <svg
            class="add"
            height="35px"
            id="Layer_1"
            style="enable-background:new 0 0 512 512;"
            version="1.1"
            viewBox="0 0 512 512"
            width="35px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            @click="addPost"
          >
            <path
              d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7  c-2.2-2.2-5.1-5.9-9.5-5.9c-4.4,0-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7  c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1c2.3,2.3,5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2L462,121.8  c1.2-1.7,2-3.6,2-5.8C464,113.5,463,111.4,461.6,109.6z"
            />
          </svg>
        </form>
      </div>
      <div class="reWritePosts" v-if="posts.length">
        <h2>Переписать запись</h2>
        <ul>
          <li v-for="post in posts" :key="post._id" @click="reWrite(post._id)">
            <div class="header">
              <p>{{ post.header }}</p>
              <svg
                height="20px"
                id="Layer_1"
                style="enable-background:new 0 0 20 20;"
                version="1.1"
                viewBox="0 0 512 512"
                width="20px"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"
                />
              </svg>
            </div>
            <form method="post" v-if="post.write === true">
              <input
                type="text"
                placeholder="Измените заголовок параграфа"
                v-model="reHeader"
                id="haeder"
              />
              <Editor
                api-key="ue6qgz846qz0ltofkupmx73brc833vypzbqlt0hnnt4jsh5f"
                :init="{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  ],
                  toolbar:
                    'code undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample ',
                }"
                v-model="reText"
              />
              <div class="svgs">
                <svg
                  class="edit"
                  height="35px"
                  id="Layer_1"
                  style="enable-background:new 0 0 512 512;"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="35px"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  @click="reWritePost(post._id)"
                >
                  <path
                    d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7  c-2.2-2.2-5.1-5.9-9.5-5.9c-4.4,0-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7  c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1c2.3,2.3,5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2L462,121.8  c1.2-1.7,2-3.6,2-5.8C464,113.5,463,111.4,461.6,109.6z"
                  />
                </svg>
                <svg
                  fill="none"
                  height="32"
                  viewBox="0 0 28 28"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="close(post._id)"
                  class="close"
                >
                  <path
                    d="M2.32129 2.32363C2.72582 1.9191 3.38168 1.9191 3.78621 2.32363L25.6966 24.234C26.1011 24.6385 26.1011 25.2944 25.6966 25.6989C25.2921 26.1035 24.6362 26.1035 24.2317 25.6989L2.32129 3.78854C1.91676 3.38402 1.91676 2.72815 2.32129 2.32363Z"
                    fill="red"
                  />
                  <path
                    d="M25.6787 2.30339C25.2742 1.89887 24.6183 1.89887 24.2138 2.30339L2.30339 24.2138C1.89887 24.6183 1.89887 25.2742 2.30339 25.6787C2.70792 26.0832 3.36379 26.0832 3.76831 25.6787L25.6787 3.76831C26.0832 3.36379 26.0832 2.70792 25.6787 2.30339Z"
                    fill="red"
                  />
                </svg>
              </div>
            </form>
          </li>
        </ul>
      </div>
      <div class="removePost" v-if="posts.length">
        <h2>Удалить запись</h2>
        <ul>
          <li v-for="post in posts" :key="post._id" class="removeItem">
            <p>{{ post.header }}</p>
            <svg
              enable-background="new 0 0 55 55"
              height="55px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="55"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              @click="removePost(post._id)"
            >
              <g>
                <line
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="10"
                  x1="309.6"
                  x2="202.4"
                  y1="202.4"
                  y2="309.6"
                />
                <line
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="10"
                  x1="309.6"
                  x2="202.4"
                  y1="309.6"
                  y2="202.4"
                />
              </g>
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <footer v-if="hidePage">
      <div class="mid">&copy; 2021. Все права защищены.</div>
    </footer>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      status: 200,
      header: "",
      text: "",
      reHeader: "",
      reText: "",
      posts: [],
      login: "",
      password: "",
      hide: false,
      hidePage: false,
    };
  },
  methods: {
    //метод запроса
    async request(url, method = "GET", data = null) {
      try {
        const headers = {};
        let body = "";
        if (data !== null) {
          headers["Content-Type"] = "application/json;charset=utf-8";
          body = JSON.stringify(data);
          const res = await fetch(url, {
            method,
            headers,
            body,
          });
          return await res.json();
        } else {
          const res = await fetch(url);
          return await res.json();
        }
      } catch (err) {
        console.error(err);
      }
    },

    //Возвращение на гл. страницу
    returnToMainPage() {
      this.$router.push("/");
    },

    //Авторизация
    async auth() {
      const data = await this.request("/api/auth", "POST", {
        user: this.login,
        password: this.password,
      });
      if (data.status === 404) {
        this.status = data.status;
      } else {
        this.hide = true;
        this.posts = await this.request("/api/posts");
      }
    },

    //добавить пост
    async addPost() {
      if (this.header === "" || this.text === "") {
        alert("Напишите заголовок записи или содержимое записи");
      } else {
        await this.request("/api/posts", "POST", {
          header: this.header,
          text: this.text,
          write: false,
        });
        this.header = this.text = "";
        this.posts = await this.request("/api/posts");
      }
    },

    //метод открытия меню изменения поста
    reWrite(id) {
      this.reHeader = this.reText = "";

      const posts = this.posts;

      posts.forEach((post) => {
        post.write = false;
      });

      const ourPost = posts.find((post) => post._id === id);
      ourPost["write"] = true;
      const index = posts.findIndex((post) => post._id === id);

      if (this.reHeader === "" && this.reText === "") {
        this.reHeader = ourPost.header;
        this.reText = ourPost.text;
      }

      this.posts[index] = ourPost;
    },

    //метод изменения самого поста
    async reWritePost(id) {
      const ourPost = this.posts.find((post) => post._id === id);

      if (this.reText === ourPost.text && this.reHeader === ourPost.header) {
        this.posts = await this.request("/api/posts");
      } else {
        await this.request(`/api/posts/${id}`, "POST", {
          header: this.reHeader,
          text: this.reText,
        });
        this.posts = await this.request("/api/posts");
      }
    },

    //метод закрытия меню поста
    async close() {
      this.posts = await this.request("/api/posts");
    },

    //удлить пост
    async removePost(id) {
      await this.request(`/api/posts/${id}`, "DELETE", { id });
      this.posts = await this.request("/api/posts");
    },
  },
  async mounted() {
    if (this.$cookies.get("session")) {
      this.hide = true;
      this.posts = await this.request("/api/posts");
      console.log(this.posts);
      this.hidePage = true;
    }
  },
};
</script>

<style scoped>
.error {
  text-align: center;
  margin-top: 10px;
  color: red;
}

.adminPanel {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  color: #fff;
}

.return {
  hight: auto;
}

.return svg {
  cursor: pointer;
}

.adminPanel h2 {
  text-align: center;
  color: #333;
  margin-bottom: -10px;
}

.panel {
  position: relative;
  background: #fff;
  width: 650px;
  height: 350px;
  top: 20%;
  border-radius: 8px;
  margin: 0 auto;
}

.panel form {
  top: 30px;
  margin: 0 auto;
  display: flex;
  width: 75%;
  opacity: 1;
  flex-direction: column;
}

.panel form input {
  margin-top: 25px;
  height: 40px;
  border-radius: 5px;
  border: 2.5px silver solid;
  padding-left: 6px;
  font-size: 1em;
}

.panel form .button {
  text-align: center;
  margin-top: 35px;
}

.panel form .button button {
  font-size: 1em;
  padding: 5px 15px;
  border: 2px solid silver;
  border-radius: 8px;
}

button {
  background: #fff;
}

.admin {
  margin-top: 25px;
}

h2 {
  text-align: center;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  cursor: pointer;
}

.svgs {
  margin-top: 15px;
}

.svgs .close {
  margin-left: 25px;
}

.edit,
.add {
  fill: green;
}

.add {
  margin-top: 15px;
}

.header svg {
  margin-left: 10px;
}

svg {
  align-self: center;
  cursor: pointer;
}

.link {
  margin-top: 20px;
}

form {
  width: 65%;
  margin: 30px auto;
}

.mid form input {
  height: 45px;
  width: 100%;
  margin-bottom: 40px;
  font-size: 1.3em;
  padding: 4px 0 0 10px;
  border-radius: 8px;
  border: 2px solid #b3b3b3;
}
.removeItem {
  display: flex;
}

@media screen and (max-width: 1200px) {
  .panel {
    width: 450px;
  }
  .mid form {
    width: 100%;
  }
}

@media screen and (max-width: 800px) {
  .panel {
    width: 350px;
  }
  .adminPanel h2 {
    font-size: 1.5em;
  }
  .panel form input {
    height: 30px;
    font-size: 0.8em;
  }
}

@media screen and (max-width: 440px) {
  .mid form input {
    height: 35px;
    margin-bottom: 30px;
    padding: 5px 10px;
    font-size: 1em;
  }
}
</style>
