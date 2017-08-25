export default {
    methods: {
        ajax(params) {

            let dataToSend = '';
            Object.keys(params.data).forEach(key => dataToSend += key + '=' + params.data[key] + '&');

            this.$http[params.method](params.url, dataToSend)
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