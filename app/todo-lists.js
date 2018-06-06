import { LitElement, html } from '@polymer/lit-element'
import { repeat } from 'lit-html/lib/repeat'
import './todo-list.js'
// ${repeat(lists, (i) => i.id, (t, index) =>html`
// <todo-list index="${index} data="${t}"></todo-list><br>` )}
// html`
//             <li style="text-decoration:${t.status ? 'line-through' : 'none'};">${index + 1}: ${t.text}</li>


class TodoLists extends LitElement {
    static get properties() {
        return {
            lists: Array
        }
    }

    _render({ lists }) {
        return html`
         จำนวนข้อความ ${lists.length}
        <ul>
           
            ${lists.map((item,index)=> {
              return  html`<todo-list index="${index+1}" status="${item.status}" text="${item.text}"></todo-list><br>
                         <button index="${index}" 
                                 action="success" 
                                 on-click="${(e) => this._actionTodo(e)}"
                                 disabled="${item.status}">ทำสำเร็จ</button>
                         <button index="${index}" 
                                 action="delete" 
                                 on-click="${(e) => this._actionTodo(e)}
                                 disabled="${!item.status}"">ลบ</button>`
            })}
        </ul>
        `
    }
    _actionTodo(e) {
        let index = e.currentTarget.index
        let action = e.currentTarget.getAttribute('action')

        this.dispatchEvent(new CustomEvent('action', { detail: { index: index, action: action } }))
    }
    // _didRender(props, changeProps, prevProps) {
    //     console.log(props, changeProps, prevProps);
    // }
}
customElements.define('todo-lists', TodoLists)