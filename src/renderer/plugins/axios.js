import Axios from 'axios'

export default (vm, url) => {
  
  const instanceAxios = Axios.create({ baseURL: url })

  instanceAxios.interceptors.request.use(
    response => {
      const token = localStorage.getItem('token')
      if (token) response.headers['Authorization'] = 'Bearer ' + token
      return response
    },
    error => Promise.reject(error)
  )

  instanceAxios.interceptors.response.use(
    response => response,
    error => {
      if (error.request.status === 401) {
        vm.$refs.app.logOut()
      }
      return Promise.reject(error)
    }
  )

  return instanceAxios
}