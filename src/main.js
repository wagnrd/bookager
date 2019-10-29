import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import Books from '@/components/Books'

Vue.config.productionTip = false;

new Vue({
    data: {
        domain: 'http://localhost:1030',
        authKey: '00',
        bookshelves: [],
        books: []
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
                return {headers: {'Content-Type': 'application/json'}}
            }
        },

        // Login
        async login(username, password) {
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
        },

        // Books
        async getAllBooks(sort) {
            axios.get(this.domain + '/books', this.config())
                .then(response => {
                    this.books = response.data.sort(sort);
                    return true;
                })
                .catch(() => {
                    return false;
                });
        },

        async getFilteredBooks(filter, sort) {
            axios.get(this.domain + '/books', this.config())
                .then(response => {
                    this.books = response.data.sort(sort).filter(filter);
                    return true;
                })
                .catch(() => {
                    return false;
                });
        },

        async deleteBook(id) {
            axios.delete(this.domain + '/books/' + id, this.config())
                .then(() => {
                    return true
                })
                .catch(() => {
                    return false
                });
        },

        // Bookshelves
        async getAllBookshelves(sort) {
            axios.get(this.domain + '/bookshelves', this.config())
                .then(response => {
                    this.bookshelves = response.data.sort(sort);

                    for (let i = 0; i < this.bookshelves.length; i++) {
                        this.bookshelves[i]['activatingComponent'] = Books;
                    }

                    return true;
                })
                .catch(() => {
                    return false;
                });
        },

        async getBookshelfBooks(id, sort) {
            axios.get(this.domain + '/bookshelves/' + id + '/books', this.config())
                .then(response => {
                    this.books = response.data.sort(sort);

                    for (let i = 0; i < this.bookshelves.length; i++) {
                        this.bookshelves[i]['activatingComponent'] = Books;
                    }

                    return true;
                })
                .catch(() => {
                    return false;
                });
        }
    },

    vuetify,
    render: h => h(App)
}).$mount('#app');
