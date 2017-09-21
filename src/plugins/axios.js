import Axios from 'axios'

const instanceAxios = Axios.create({
    baseURL: 'http://api.jonkofee.ru'
})

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
            vm.$children[0].logOut()
        }
        return Promise.reject(error)
    }
)

export default instanceAxios

