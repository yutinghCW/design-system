import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const app = createApp({
    data() {
        return {
            pagination: {
                now: 1
            },
        }
    },
    mounted() {
        // hljs.initHighlightingOnLoad();
    },
})
app.mount('#app')
