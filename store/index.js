export const state = () => ({
  token: null,
})
console.log(state)
export const mutations = {
  getToken(state, text) {
    console.log(state.token, text)
    state.token = text
  },
}
