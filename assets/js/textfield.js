import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const app = createApp({
    data() {
        return {
            tab: true,
            value: '',
            option: {
                counter: false,
                icon: false,
            },
            state: 'none',
        }
    },
    mounted() {
        hljs.initHighlightingOnLoad();
    },
})
app.mount('#app')
