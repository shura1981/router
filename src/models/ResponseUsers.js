export  class ResponseUsers {
    #data = [];
    #support = [];
    constructor() {
        this.page = 0;
        this.per_page = 0;
        this.total = 0;
        this.total_pages = 0;
    }
    get users() {
        return this.#data.map(item => DataUsers.fromJson(item));
    }
    get support() {
        return this.#support.map(item => SupportUsers.fromJson(item));
    }

    static fromJson(json) {
        const response = new ResponseUsers();
        response.page = json.page;
        response.per_page = json.per_page;
        response.total = json.total;
        response.total_pages = json.total_pages;
        response.#data = json.data;
        response.#support = json.support;
        return response;
    }
}

export  class ResponseUser {
   
    constructor() {
        this.data= new DataUsers();
        this.support= new SupportUsers();
    }
    static fromJson(json) {
        const response = new ResponseUser();
        response.data = DataUsers.fromJson( json.data);
        response.support = SupportUsers.fromJson( json.support);
        return response;
    }
}

export class DataUsers {
    constructor() {
        this.id = 0;
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.avatar = "";
    }
    static fromJson(json) {
        const data = new DataUsers();
        data.id = json.id;
        data.email = json.email;
        data.first_name = json.first_name;
        data.last_name = json.last_name;
        data.avatar = json.avatar;
        return data;
    }
}

class SupportUsers {
    constructor() {
        this.url = "";
        this.text = "";
    }
    static fromJson(json) {
        const support = new SupportUsers();
        support.url = json.url;
        support.text = json.text;
        return support;
    }

}