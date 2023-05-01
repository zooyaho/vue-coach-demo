<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/ hour</h3>
    </base-card>
  </section>
  <section>
    <!-- contact 양식과 버튼 -->
    <base-card>
      <header>
        <h2>흥미로우신가요? 지금 바로 연락하세요!</h2>
        <base-button link :to="contactLink">Contact</base-button>
        <router-view></router-view>
      </header>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="(area, idx) in areas"
        :key="idx"
        :title="area"
        :type="area"
        >{{ area }}</base-badge
      >
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      console.log('areas: ', this.selectedCoach.areas);
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
