export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const res = await fetch(
      `https://vue-http-b19e2-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    if (!res.ok) {
      // error...
      const error = new Error(resData.message || 'Failed to fetch!');
      throw error;
    }

    const resData = await res.json();

    newRequest.id = resData.name; // firebase 자동 id 생성 뒤 반환
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const res = await fetch(
      `https://vue-http-b19e2-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const resData = await res.json();

    if (!res.ok) {
      // error...
      const error = new Error(resData.message || '오류 발생!!');
      throw error;
    }

    const requests = [];

    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message,
      };

      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
