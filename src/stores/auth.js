import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // store user data if logged in
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    login(userData) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    loadUser() {
      const saved = localStorage.getItem('user')
      if (saved) {
        this.user = JSON.parse(saved)
      }
    },
  },
})
