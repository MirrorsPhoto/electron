export default {
    methods: {
        serialize(obj = {}) {
            let res = ''
            Object.keys(obj).forEach(key => res += key + '=' + obj[key] + '&')
            return res
        },
        ajax(params) {
            const baseUrl = 'http://jonkofee.ru/'

            this.$http[params.method](
                baseUrl + params.url,
                this.serialize(params.data)
            )
            .then(response => params.success(response))
            .catch(error => {
                params.error(error)

                if (error.request.status === 401) {
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                }
            })
        }
    }
}