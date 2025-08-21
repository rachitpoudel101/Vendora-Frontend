import { defineStore } from 'pinia'
import axios from 'axios'
import { authAPI } from "../core/auth"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | Record<string, any>,
    token: '' as string,
    loading: false,
    error: null as null | string,
  }),
  getters: {
    self: (state) => state.user,
  },
  actions: {
    async login(credentials: { username: string; password: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post(authAPI.login, credentials)
        this.token = res.data.token
        this.user = res.data.user
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Login failed'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.loading = true
      try {
        await axios.post(authAPI.logout)
      } catch {}
      this.token = ''
      this.user = null
      delete axios.defaults.headers.common['Authorization']
      this.loading = false
    },
    async self() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(authAPI.self)
        this.user = res.data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch user details'
      } finally {
        this.loading = false
      }
    },
  },
})
