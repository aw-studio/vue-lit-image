import LitImage from './LitImage.vue';
import 'lazysizes';

export default {
    install(app, options) {
        app.config.globalProperties.$litImageOptions = options;

        app.component('lit-image', LitImage);
    },
};
