<template>
  <section>필터링 공간</section>
  <section>
    <div class="controls">
      <button>새로고침</button>
      <router-link to="/register">코치 등록</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coache in filteredCoaches" :key="coache.id">
        {{ coache.firstName }}
      </li>
    </ul>
    <h3 v-else>코치가 존재하지 않습니다.</h3>
  </section>
</template>

<script>
export default {
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style></style>
