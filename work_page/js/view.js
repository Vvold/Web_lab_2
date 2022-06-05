import BaseView from "../../base.js";

export default class View extends BaseView {
    constructor(model) {
        super();
        this.model = model;
        this.form = null;
        this.pdNumberInput = null;
        this.pdNameInput = null;
        this.pdsContainer = null;
        this.addPDController = null;
        this.removePDController = null;
        this.initView();
    }

    initView() {
        this.initElements();
        this.initListeners();
        this.renderPDs();
    }

    initElements() {
        this.form = this.query('form');
        this.pdNumberInput = this.query('#number');
        this.pdNameInput = this.query('#name');
        this.pdsContainer = this.query('#pds-container')
    }

    initListeners() {
        this.setEvent(this.form, 'submit', (e) => e.preventDefault());
    }

    initControllers(controller) {
        this.addPDController = controller.add;
        this.removePDController = controller.remove;
    }

    onAdd() {
        this.addPDController({
            number: this.pdNumberInput.value,
            name: this.pdNameInput.value,
        });

        this.pdNumberInput.value = '';
        this.pdNameInput.value = '';

        this.renderPDs();
    }

    onRemove(id) {
        this.removePDController(+id);
        this.renderPDs();
    }

    renderPDs() {
        this.pdsContainer.innerHTML = '';
        this.model.pds.forEach(pd => {
            this.pdsContainer.insertAdjacentHTML('beforeend', this.getTodoItemHtml(pd.number, pd.name, pd.id));
        });

        this.queryAll('.remove-pd-btn').forEach(btn => {
            btn.addEventListener('click', () => this.onRemove(btn.getAttribute('data-pd-id')));
        });
    }

    getTodoItemHtml(number, name, id) {
        return `
             <div class="pd-item">
                <div class="item-name"><h5>${name}</h5></div>
                <p>${number}</p>
                <div class="actions">
                    <button type="button" data-pd-id="${id}" class="btn-close btn-close-white remove-pd-btn" aria-label="Close"></button>
                </div>
             </div>
        `
    }

}