<template>
  <section>필터링 공간</section>
  <section>
    <div class="controls">
      <button>새로고침</button>
      <router-link to="/register">코치 등록</router-link>
    </div>
    <ul v-if="hasCoaches">
      <CoachItem
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></CoachItem>
    </ul>
    <h3 v-else>코치가 존재하지 않습니다.</h3>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: { CoachItem },
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

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
