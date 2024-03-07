export default class Component {
    constructor({name = 'Component', config}) {
        this.id = crypto.randomUUID();
        this.isDeleted = false;
        this.name = name;
        this.config = config;
    }

    delete(){
        this.isDeleted = true;
    }
}