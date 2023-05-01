import getters from '../requests/getters';
import actions from '../requests/actions';
import mutations from '../requests/mutations';

export default {
  namespaced: true,
  state() {
    // 모든 요청을 관리한다.
    // 요청엔 해당 코치 id가 있다.
    return {
      requests: [],
    };
  },
  getters,
  mutations,
  actions,
};
