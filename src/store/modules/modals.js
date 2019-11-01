
const state = {
  modals: {
    loginFormPopup: false,
    registerFormPopup: false
  }
};

const getters = {
  loginFormPopup: state => state.modals.loginFormPopup,
  registerFormPopup: state => state.modals.registerFormPopup,
}

const mutations = {
  updateLoginFormPopup (state, value) {
    state.modals.loginFormPopup = value;
  },
  updateRegisterFormPopup (state, value) {
    state.modals.registerFormPopup = value;
  }
};

export default {
  state,
  getters,
  mutations,
}
