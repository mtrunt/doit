import Vue from 'vue';
import Resource from 'vue-resource';
import App from './app.vue';

Vue.use(Resource);
Vue.http.options.root = '/api';

new Vue({
    el: '#app',
    render: h => h(App)
});
