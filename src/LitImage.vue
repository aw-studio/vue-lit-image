<template>
    <div class="image-container">
        <img
            :src="imageSrc"
            class="lazyload lazyload-animation"
            :class="classes"
            :data-srcset="dataSrcset"
            data-sizes="auto"
            :alt="alt"
            :title="title"
        />
    </div>
</template>

<script>
import pathinfo from './pathinfo';

export default {
    name: 'LitImage',
    props: {
        image: {
            type: Object,
            required: true,
        },
        classes: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            thumbnail: null,
        };
    },
    beforeMount() {
        this.thumbnail = this.makeThumbnail();
    },
    methods: {
        /**
         * get the existing conversionsizes and sort them
         */
        getMediaConversions() {
            let imageConversions = [];

            const sortable = Object.fromEntries(Object.entries(this.conversionSizes).sort(([, a], [, b]) => a - b));
            for (const [key, value] of Object.entries(sortable)) {
                imageConversions.push([key, value]);
            }

            return imageConversions;
        },

        /**
         * Get the thumbnail image
         */
        makeThumbnail() {
            const conversion = this.getMediaConversions()[0][0];
            let url = null;

            for (const [key, value] of Object.entries(this.image.conversion_urls)) {
                if (key == conversion) {
                    url = value;
                }
            }
            const b64 = this.b64(url);

            return b64;
        },

        /**
         * Make base64 string of image
         */
        b64(path) {
            if (!path) {
                return;
            }

            let type = pathinfo(path, 'PATHINFO_EXTENSION');
            // let data = file_get_contents(path);

            return `data:application/${type};base64,${btoa(path)}`;
        },
    },
    computed: {
        locale() {
            return window.location.pathname.split('/')[1];
        },
        conversionSizes() {
            let sizes = this.$litImageOptions.conversions;
            return sizes;
        },
        alt() {
            if (this.locale == 'de') {
                return this.image.custom_properties.de?.alt ?? this.image.custom_properties.alt ?? '';
            }
            if (this.locale == 'en') {
                return this.image.custom_properties.en?.alt ?? this.image.custom_properties.alt ?? '';
            }
            return this.image.custom_properties.alt ?? '';
        },
        title() {
            if (this.locale == 'de') {
                return this.image.custom_properties.de?.title ?? this.image.custom_properties.title ?? '';
            }
            if (this.locale == 'en') {
                return this.image.custom_properties.en?.title ?? this.image.custom_properties.title ?? '';
            }
            return this.image.custom_properties.title ?? '';
        },
        imageSrc() {
            if (this.getMediaConversions().length) {
                return this.thumbnail;
            }
            return this.image.url;
        },
        dataSrcset() {
            let srcset = '';
            const conversions = this.getMediaConversions();
            // console.log(conversions);
            let urls = [];
            for (const [key, value] of Object.entries(this.image.conversion_urls)) {
                if (key in this.conversionSizes) {
                    urls.push([key, value]);
                }
            }
            for (let i = 0; i < conversions.length; i++) {
                const conversion = conversions[i];
                const url = urls[i];
                if (url[0] == conversion[0]) {
                    srcset = srcset + ` ${url[1]} ${conversion[1]}w,`;
                }
            }
            // console.log(srcset);
            return srcset;
        },
    },
};
</script>

<style scoped>
.image-container {
    overflow: hidden;
}
.lazyload,
.lazyloading {
    -webkit-filter: blur(20px);
    filter: blur(20px);
}
.lazyloaded {
    -webkit-filter: blur(0px);
    filter: blur(0);
}
.lazyload-animation {
    transition: 0.25s filter ease;
}
</style>
