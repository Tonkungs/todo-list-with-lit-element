import { LitElement, html } from '@polymer/lit-element';

import './todo-lists.js'
class AppMain extends LitElement {

    static get properties() {
        return {
            todolist: Array
        }
    }
    constructor() {
        super()
        this.todolist = [
            {
                text: 'อ่านหนังสือ',
                status: false
            }
        ]
    }
    _render({ todolist, num }) {
        return html`
            
             ข้อความ :
            <input id="text" type="text" on-keyup="${(e) => this._KeyUpTodo(e)}">
            <button on-click="${(e) => this._addTodo(e)}"> เพิ่ม</button>
            <br>
            <todo-lists lists="${todolist}" on-action="${(e) => this._action(e)}"></todo-lists>

        `;
    }
    async _addTodo(e) {
        // this.num++
        let element = this.shadowRoot.querySelector('#text')
        // console.log(element.value);
        // * ต้อง โคลนดาต้าออกมาก่อนเพื่อให้
        // let data = JSON.parse(JSON.stringify(this.todolist))
    //     data.push(
    //         {
    //         text: element.value,
    //         status: false
    //     }
    // )
        // this.todolist = data
        this.todolist.push( {
            text: element.value,
            status: false
        })
        this.todolist = this.todolist.slice(0)


        element.value = ''
        // await this.renderComplete;
    }
    _KeyUpTodo(e){
        e.preventDefault()
        if (e.keyCode === 13) {
            this._addTodo(e)
          }
    }
    _action(e) {
        let index = e.detail.index
        // โคลนดาต้า
        // let listForDelete = JSON.parse(JSON.stringify(this.todolist))
        let listForDelete = this.todolist
        let action = e.detail.action
        let listConcat = []
        switch (action) {
            case 'success':
                listForDelete[index].status = true
                listConcat = listForDelete
                break;
            case 'delete':
                let listStart = listForDelete.slice(0, index)
                let listEnd = listForDelete.slice(index + 1, listForDelete.length)
                listConcat = [...listStart, ...listEnd]
                break;
            default:
                break;
        }
        // https://stackoverflow.com/questions/5024085/whats-the-point-of-slice0-here
        // console.log('listConcat', listConcat)
        this.todolist = listConcat
        // ให้ค่าอาเรย์เปลี่ยนแปลง แต่ .map จะรู้แค่ผิวข้างนอก แต่ไม่รู้ถึงอ็อปเจ็ค
        // this.todolist = this.todolist.slice(0)
        this.todolist = [...this.todolist]
    }
    // _shouldRender(props, changedProps, prevProps) {
    //     // 2
    //     console.log('_shouldRender');

    //     console.log(props, changedProps, prevProps);
    //     // * ต้องมีค่า return เพื่อให้เว็บ render
    //     return true
    // }
    _didRender(props, changeProps, prevProps) {
        console.log('_didRender');

        console.log(props, changeProps, prevProps);

    }

}

customElements.define('app-main', AppMain);