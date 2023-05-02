<template>
  <base-dialog :show="!!error" title="오류가 발생!!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card>
    <section>
      <h2>지금 바로 코치로 가입하세요!</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </section>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
      } catch (error) {
        this.error = error.message || '오류가 발생해버렸다~!';
      }
      this.$router.replace('/coaches');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
