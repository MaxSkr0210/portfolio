<template>
  <div class="home">
    <div class="mid">
      <div class="header">
        <h2 class="definitionHeader">История информатики</h2>
        <section class="definition">
          <p>
            Для того чтобы в дальнейшем беседовать об информатике, нужно понять,
            что это. Итак, по мнению автора учебника “Информатика” Степанова
            А.Н.
            <img
              alt="Информатика"
              style="float: right; margin-left: 15px"
              src="https://st-1.akipress.org/st_gallery/17/955917.6f89c37d3caa111a8de16932c9d13324.jpg"
              height="150px"
              class="right_img"
            />
            “Информатика – фундаментальная естественная наука о структуре и
            общих свойствах информации, а также об осуществляемой
            преимущественно с помощью автоматизированных средств целесообразной
            обработке информации, рассматриваемых как отображение знаний и
            факторов, сведений, данных в различных областях человеческой
            деятельности”. Второе же, более популярное и простое определение
            информатики - “это наука о средствах, методах, и способах сбора,
            обмена, хранения и обработки информации”. “Термин информатика
            появился только в 60–ых годах XX века во французском языке
            (informatique), английским эквивалентом считается слово сочетание
            computer science”. Слово информатика создано с помощью слов –
            “информация” и “автоматика”, значит, оно означает автоматическую
            работу с информацией. Но про слово забыли на долго, и вновь вошло в
            оборот лишь в 80-ых годах ХХ века, после того как появились новые
            определения и операции, связанные с информацией.
          </p>
        </section>
      </div>
      <div v-if="!hide">
        <div class="menu">
          <h5 class="menu-title">История информатики</h5>
          <div class="menu-body">
            <ul class="menu-list">
              <MenuItem :posts="posts" @openContent="openContent" />
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer v-if="hide === false">
      <div class="mid">&copy; 2021. Все права защищены.</div>
    </footer>
  </div>
</template>

<script>
import MenuItem from "../components/V-menu.vue";

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      posts: [],
      hide: true,
      scrolled: 0,
    };
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY;
    },
    async request() {
      const res = await fetch("/api/posts");
      return await res.json();
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  async mounted() {
    this.posts = await this.request();
    this.hide = false;
    this.posts = await this.request();
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  opacity: 0;
}

.mid {
  flex: 1 0 auto;
}

.menu {
}

footer {
  flex-shrink: 0;
}

.definition {
  text-align: justify;
}
.header {
  margin: 15px 0;
}

.up {
  position: fixed;
  bottom: 65px;
  right: 25px;
  cursor: pointer;
}

.definition {
  margin-top: 15px;
}

.menu-body {
  width: 330px;
  border: 7px solid #0d6efd;
  background: #4590ff;
  padding: 20px;
  color: #fff;
  margin-top: 15px;
}

.menu-list {
  margin: 0;
}

ul,
li {
  list-style: none;
  padding: 0;
}

@media screen and (max-width: 1050px) {
  .up {
    bottom: 15px;
    right: 15px;
  }
}

@media screen and (max-width: 858px) {
  .menu {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 770px) {
  .up {
    bottom: 10px;
    right: 10px;
  }
}

@media screen and (max-width: 393px) {
  .menu {
    width: 100%;
  }
}

.up-enter-active,
.up-leave-active {
  transition: all 0.5s;
}

.up-enter,
.up-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
