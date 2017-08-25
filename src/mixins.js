export default {
    methods: {
        serialize(obj = {}) {
            let res = '';
            Object.keys(obj).forEach(key => res += key + '=' + obj[key] + '&');
            return res;
        },
        ajax(params) {
            this.$http[params.method](
                params.url,
                this.serialize(params.data)
            )
            .then(response => params.success(response))
            .catch(error => {
                params.error(error);

                if (error.request.status === 401) {
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                }
            });
        }
    }
}