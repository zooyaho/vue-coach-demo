export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };

    // 가입 후 코치 등록 flow
    // 코치 ID는 코치로 등록 하기 전부터 존재한다는 가정으로, PUT을 요청한다.
    const response = await fetch(
      `https://vue-http-b19e2-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await response.json();

    if (!responseData.ok) {
      // error...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
};
