import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const app = createApp({
    data() {
        return {
            tab1: true,
            tab2: true,
            value1: '',
            option1: {
                counter: false,
                icon: false,
            },
            state1: 'none',
            // 
            value2: '',
            type2: 'contained',
            option2: {
                counter: false,
                icon: false,
            },
            state2: 'none',
            disabled2: false,
        }
    },
})
app.mount('#app')
