<template>
  <base-dialog :show="!!error" title="오류가 발생!!" @close="handleError">
    <!-- 콘텐츠 섹션 -->
    <p>{{ error }}</p>
  </base-dialog>
  <coach-filter @change-filter="setFilters"> </coach-filter>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">새로고침</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register"
          >코치 등록</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
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
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        } else if (
          this.activeFilters.backend &&
          coach.areas.includes('backend')
        ) {
          return true;
        } else if (
          this.activeFilters.career &&
          coach.areas.includes('career')
        ) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      // 로딩 중에는 목록을 표시하지 않으니까
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    setFilters(updatedFiltes) {
      this.activeFilters = updatedFiltes;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        // 모달을 통한 오류 메시지 표시
        this.error = error.message || '오류가 발생 했습니다!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
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
