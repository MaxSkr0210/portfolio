<template>
  <div>
    <li v-for="post in posts" class="menu-item" :key="post._id">
      <router-link
        :to="{ name: 'Content_Page', params: { id_content: post._id } }"
        >{{ post.header }}</router-link
      >
    </li>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
    },
  },
  methods: {
    openContent(id) {
      this.$emit("openContent", {
        id,
      });
    },
  },
};
</script>

<style>
.menu-list {
  margin-top: 15px;
}

a {
  color: #fff;
}

.menu-item {
  margin-top: 12px;
  cursor: pointer;
}

.menu-item:first-child {
  margin-top: 0;
}
</style>
