import { LitElement, html, classString } from '@polymer/lit-element';

class TodoList extends LitElement {
    static get properties() {
        return {
            index: Number,
            text: Object,
            status: Boolean
        }
    }
    constructor() {
        super()
        this.index = 0
        this.text = ''
        this.status = false
    }
    // props
    _render({ index, text, status }) {
        return html`<li style="text-decoration:${status ? 'line-through' : 'none'};">${index}: ${text}</li>
        `
    }
    _didRender(props, changeProps, prevProps) {
        console.log(props, changeProps, prevProps);
    }
}
customElements.define('todo-list', TodoList)