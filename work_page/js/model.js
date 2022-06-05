export class PDItemModel {
    constructor(number, name) {
        this.number = number;
        this.name = name;
        this.id = Math.floor(Math.random() * 10000);
    }
}


export default class Model {
    constructor() {
        this.isAuthorized = false;
        this.pds = [];
        this.loadTodos();
    }

    loadTodos() {
        const user = JSON.parse(localStorage.getItem('toDoUser'));
        this.pds = user.todos || [];
    }

    addTodo(pd) {
        const item = new PDItemModel(pd.number, pd.name);
        const user = JSON.parse(localStorage.getItem('toDoUser'));
        this.pds.push(item);

        localStorage.setItem('toDoUser', JSON.stringify({...user, todos: this.pds}));
    }

    removeTodo(id) {
        const idx = this.pds.findIndex(el => el.id === id);
        const user = JSON.parse(localStorage.getItem('toDoUser'));
        this.pds.splice(idx, 1);

        localStorage.setItem('toDoUser', JSON.stringify({...user, todos: this.pds}));
    }

}