const app = new Vue({
    el: '#app',
    data() {
        return {
            form: {
                header: '',
                text: ''
            },
            todos: [],
            loading: false
        }
    },
    methods: {
        async createTodo() {
            const {...todo } = this.form;

            const response = await API('api/todos', 'POST', todo);

            this.todos.push(response)

            this.form.header = this.form.text = ''
        },
        async markTodo(id) {
            const todo = this.todos.find(el => el.id === id);

            const update = await API(`api/todos/${id}`, 'PUT', {
                ...todo,
                marked: true
            });

            todo.marked = update.marked
                // todo.marked = true;
        },
        async deleteTodo(id) {

            await API(`api/todos/${id}`, 'DELETE');

            this.todos = this.todos.filter(el => el.id !== id);
        }
    },
    async mounted() {
        this.loading = true;
        this.todos = await API('api/todos');
        this.loading = false;
    }
});

async function API(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const res = await fetch(url, {
            method,
            headers,
            body
        });

        return await res.json()
    } catch (err) {
        console.error(err);
    }
}

Vue.component('loader', {
    template: `
        <div class="loader">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `
})