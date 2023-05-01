export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // 코치의 유무에 따른 화면 출력을 위한 값
    return state.coaches && state.coaches.length > 0 ? true : false;
  },
  isCoach(_state, getters, _rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
};
