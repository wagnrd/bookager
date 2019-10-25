import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;

new Vue({
    data: {
        domain: 'http://localhost:1030',
        authKey: '',
    },

    methods: {
        config(authKey = true) {
            if (authKey) {
                return {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Key': this.authKey
                    }
                }
            } else {
                return { headers: { 'Content-Type': 'application/json' } }
            }
        },

        login(username, password) {
            let data = {
                name: username,
                passwordHash: password
            };

            axios.post(this.domain + '/login', data, this.config(false))
                .then(response => {
                    this.authKey = response.headers['x-auth-key'];

                    return true;
                })
                .catch(() => {
                    return false;
                });
        },

        logout() {
            axios.get(this.domain + '/logout')
        }
    },

    vuetify,
    render: h => h(App)
}).$mount('#app');
