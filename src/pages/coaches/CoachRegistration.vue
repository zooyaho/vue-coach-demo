<template>
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
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>
