<template>
  <base-card>
    <section>
      <h2>지금 바로 코치로 가입하세요!</h2>
      <CoachForm></CoachForm>
    </section>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
};
</script>
