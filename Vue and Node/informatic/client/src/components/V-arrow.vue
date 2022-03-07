<template>
  <div>
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ transform: `rotate(${rotate}deg)`, height: `${size}` }"
    >
      <path
        class="heroicon-ui"
        d="M13 5.41V21a1 1 0 0 1-2 0V5.41l-5.3 5.3a1 1 0 1 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 1 1-1.4 1.42L13 5.4z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    rotate: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  mounted() {
    console.log(this.rotate);
  },
};
</script>

<style scoped>
svg {
  padding: 5px;
  fill: #0d6efd;
  stroke: #0d6efd;
  stroke-width: 1;
  margin: 0 10px;
  transition: all 0.5s ease;
}

@media screen and (max-width: 1050px) {
  svg {
    height: 50px;
  }
}
</style>
