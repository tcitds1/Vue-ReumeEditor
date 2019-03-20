import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const  store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        }
    }
});
const store1 = new Vuex.Store({
    state: {
        todos: [
            { id: 1, done: true},
            { id: 2, done: true}
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        }
    }
})
new Vue({
    el: '#app',
    computed: {
        count () {
            return store.state.count
        }
    },
    methods: {
        increment () {
            store.commit('increment')
        },
        decrement () {
            store.commit('decrement')
        }
    }
})