import LitImage from './LitImage.vue';
import 'lazysizes';

export default {
    install(Vue, options) {
        Vue.prototype.$litImageOptions = options;

        Vue.component('lit-image', LitImage);
    },
};
