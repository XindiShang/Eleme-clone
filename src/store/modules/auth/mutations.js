export default {
    setUser(state,payload) {
        state.token = payload.token
        state.userId = payload.userId;
        state.isAutoLogout = false;
        // state.tokenExpiration = payload.tokenExpiration
    },
    setAutoLogout(state) {
        state.isAutoLogout = true;
    }
}