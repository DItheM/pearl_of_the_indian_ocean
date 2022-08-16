const app = Vue.createApp({
    data() {
        return {
            retry: false
        }
    },
})

//parent component
app.component ('main-window', {
    template: `
        <div id="btn1">
            <button @click="addEvent" id="add"><i class="fa fa-plus"></i></button>
            <button @click="clearAll" id="clear">Clear All</button>
        </div>

        <div id="inputs">
            <p id="count">({{inputCount()}}/33)</p>
            <custom-input @keyup="clearError" id="input" v-for="(input, i) in inputs" :key="i" :label="input.label" :type="input.type" v-model="input.value"/>
            <p id="error" v-if="showError">{{error}}</p>
        </div>
        
        <hr>

        <div id="outputs">
            <custom-output id="output" v-for="(output, i) in outputs" :key="i" :eventName="output.event" :date="output.date"/>
        </div>
    `,
    components: ['custom-input','custom-output'],
    data() {
        return {
            inputs: [
                {
                    label: 'Event',
                    type: 'text',
                    value: ''
                },
                {
                    label: 'Date',
                    type: 'date',
                    value: ''
                }
            ],
            outputs: [],
            isDone: true,
            showError: false,
            error: 'You have to add values for at least Event field',
            lengthValue: ''
        }
    },
    methods: {
        //add events to the liast
        addEvent () {
            if ((this.inputs[0].value == '' && this.inputs[1].value == '') || this.inputs[0].value == '') {
                this.showError = true
            } else{
                this.outputs.push({event: this.inputs[0].value, date: this.inputs[1].value})
                // console.log(this.outputs)
                this.inputs[0].value = ''
                this.inputs[1].value = ''
                this.showError = false
            }        
        },
        //clear all events in the list
        clearAll () {
            length = this.outputs.length
            this.outputs.splice(0, length)
            this.showError = false
            // console.log(this.outputs)
        },
        //disappear error when event field get input
        clearError () {
            if (this.lengthValue > 0) {
                this.showError = false
            }
        },
        //counting length of the input items for Event field
        inputCount () {
            this.lengthValue = this.inputs[0].value.length
            return this.lengthValue 
        }
    }
})

//child component 1 - input
app.component ('custom-input', {
    template: `
        <form>
            <p id="label">{{label}}</p>
            <input id="input-main" :type="type" v-model="inputValue" maxlength="33"/>
        </form>
    `,
    props: ['type', 'label', 'modelValue',],
    computed: {
        inputValue: {
            get () {
                return this.modelValue
            },
            set (value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
})

//child component 2 - output
app.component ('custom-output', {
    template: `
        <div id="output-main">
            <p id="event">{{eventName}}</p>
            <p id="date">{{date}}</p>
            <div id="btn2">
                <button id="delete" @click="deleteEvent"><i class="fa fa-trash"></i></button>
                <button id="completed" v-if="this.isDoneEvent" @click="doneEvent" >Completed <i class="fa fa-check-square"></i></button>
                <button id="not-completed" v-else @click="doneEvent" >Not Completed <i class="fa fa-check-square"></i></button>
            </div>
            <br>
        </div>
    `,
    props: ['eventName', 'date', 'outputs', 'isDone'],
    methods: {
        //delete selected event
        deleteEvent () {
            index = this.$parent.outputs.findIndex(x => x.event ===this.eventName && x.date ===this.date);
            this.$parent.outputs.splice(index, 1)
            // console.log(this.$parent.outputs)
        },
        //mark as completed selected event
        doneEvent () {
            isDoneEvent = this.$parent.isDone
            this.isDoneEvent = !this.isDoneEvent
            // console.log(this.isDoneEvent)
        }
    },
    data() {
        return {
            isDoneEvent: false
        }
    },
})

app.mount('#app')