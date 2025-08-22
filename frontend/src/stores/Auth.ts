import { authAPI } from '../core/auth'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    error: null as string | null,
    loading: false,
    user: null as any, 
  }),
  actions: {
    async login(payload: { username: string; password: string }) {
      const { username, password } = payload
      this.loading = true
      this.error = null
      try {
        const res = await axios.post(authAPI.login, { username, password })
        this.token = res.data.access
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.error = null
      } catch (err: any) {
        this.token = null
        this.error = err.response?.data?.detail || 'Login failed'
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await axios.post(authAPI.logout)
      } catch {}
      this.token = null
      this.user = null
      delete axios.defaults.headers.common['Authorization']
      this.loading = false
    },

    async self() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(authAPI.self, {
          headers: {
            Authorization: this.token ? `Bearer ${this.token}` : undefined,
          }
        })
        this.user = res.data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch user details'
      } finally {
        this.loading = false
      }
    },
  },
})
