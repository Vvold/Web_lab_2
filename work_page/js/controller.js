import BaseController from "../../base.js";

export default class Controller extends BaseController {
    constructor(view, model) {
        super();
        this.view = view;
        this.model = model;
        this.savePDBtn = null;
        this.redirectLink = null;
        this.view.initControllers({
            add: this.onAdd,
            remove: this.onRemove,
        });
        this.init();
    }

    init() {
        this.initElements();
        this.initListeners();
    }

    initElements() {
        this.savePDBtn = this.query('#save-pd-btn');
        this.redirectLink = this.query('#redirectLink');
    }

    initListeners() {
        this.setEvent(this.savePDBtn, 'click', () => this.view.onAdd());
    }

    onAdd(pd) {
        this.model.addTodo(pd);
    }

    onRemove(id) {
        this.model.removeTodo(id);
    }
}