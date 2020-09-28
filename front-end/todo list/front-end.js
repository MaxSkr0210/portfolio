const frontEnd = {
    data() {
        return {
            loading: false,
            form: {
                name: "",
                value: ""
            },
            contacts: []
        }
    },
    methods: {
        createContacts() {
            const {...contact } = this.form;
            this.contacts.push({...contact, id: Date.now(), mark: false })
            this.form.name = this.form.value = ''
        },
        removeContact(id) {
            this.contacts = this.contacts.filter(c => c.id !== id)
        },
        markContact(id) {
            this.contacts = this.contacts.find(c => c.id === id)
            contact.mark = true
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    }
}


const app = Vue.createApp(frontEnd)

app.component('loader', {
    template: `
        <div class="load">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `
})

app.mount('#app')