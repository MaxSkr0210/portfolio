<template>
  <div>
    <div class="mid">
      <h2 :id="`header_${index}`">{{ post.header }}</h2>
      <hr />
      <div v-html="post.text"></div>
      <div class="arrows">
        <div v-if="!hidePrevous">
          <router-link
            :to="{
              name: 'Content_Page',
              params: { id_content: prevousPost._id },
            }"
            v-scroll-to="`#header_${index}`"
          >
            <VArrow rotate="-90" size="55px" />

            {{ prevousPost.header }}
          </router-link>
        </div>
        <div class="right" v-if="!hideNext">
          <router-link
            :to="{
              name: 'Content_Page',
              params: { id_content: nextPost._id },
            }"
            v-scroll-to="`#header_${index}`"
          >
            {{ nextPost.header }}
            <VArrow rotate="90" size="55px" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VArrow from "../components/V-arrow.vue";

export default {
  components: {
    VArrow,
  },
  data() {
    return {
      post: {},
      nextPost: {},
      prevousPost: {},
      nextPostIndex: 0,
      prevousPostIndex: 0,
      index: 0,
      hideNext: false,
      hidePrevous: false,
    };
  },
  watch: {
    async $route() {
      const res = await fetch("/api/posts");
      const data = await res.json();

      this.post = data.find(
        (post) => post._id === this.$route.params.id_content
      );
      this.index = data.findIndex(
        (post) => post._id === this.$route.params.id_content
      );

      this.nextPostIndex = this.index + 1;
      this.prevousPostIndex = this.index - 1;

      if (this.nextPostIndex === data.length) {
        this.hideNext = true;
      }
      if (this.prevousPostIndex === -1) {
        this.prevousPost = data[0];
        this.hidePrevous = true;
      }
      if (this.nextPostIndex < data.length) {
        this.nextPost = data[this.nextPostIndex];
        this.hideNext = false;
      }
      if (this.prevousPostIndex >= 0) {
        this.prevousPost = data[this.prevousPostIndex];
        this.hidePrevous = false;
      }
    },
  },
  async mounted() {
    const res = await fetch("/api/posts");
    const data = await res.json();

    this.post = data.find((post) => post._id === this.$route.params.id_content);
    this.index = data.findIndex(
      (post) => post._id === this.$route.params.id_content
    );

    this.nextPostIndex = this.index + 1;
    this.prevousPostIndex = this.index - 1;

    if (this.nextPostIndex === data.length) {
      this.hideNext = true;
    }
    if (this.index === 0) {
      this.prevousPost = data[0];
      this.hidePrevous = true;
    }
    if (this.nextPostIndex < data.length) {
      this.nextPost = data[this.nextPostIndex];
      this.hideNext = false;
    }
    if (this.prevousPostIndex >= 0) {
      this.prevousPost = data[this.prevousPostIndex];
      this.hidePrevous = false;
    }
  },
};
</script>

<style scoped>
.mid {
  margin-top: 25px;
}

.arrows {
  width: 100%;
  display: flex;
}

.arrows svg {
}

.noHide {
  display: block;
}

.arrows a {
  display: flex;
  align-items: center;
  color: #0d6efd;
  height: 55px;
}

.hide {
  display: none;
}

.right {
  position: absolute;
  right: 0;
}

.left {
  positon: absolute;
  left: 0;
}
</style>
