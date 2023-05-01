import { createStore } from 'vuex';

import coachesModule from './coaches/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
  },
  state() {
    return {
      // 인증 아이디, 가입된 유저이면 가입 버튼이 활성화 되지 않는다.
      userId: 'c3',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
