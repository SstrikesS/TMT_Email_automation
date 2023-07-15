import {useAuthenticatedFetch} from "./frontend/hooks/index.js";
import {freshTemplate} from "./frontend/assets/index.js";
export async function shopApi() {
    const fetch = useAuthenticatedFetch();
    let shopApi = [];
    let response = [];

    try {
        response['shop'] = await fetch("/api/shop/info");
        response['products'] = await fetch("/api/products/all");
        let data = await response['shop'].json();
        shopApi['shop'] = data.data[0];
        data = await response['products'].json();
        shopApi['products'] = data.data;
        console.log('Product',shopApi);
    } catch (error) {
        console.log(error);
    }

    return shopApi;
}

export async function emailTemplate(template_id) {
    let template;
    try {
        const response = await fetch("http://127.0.0.1:3001/template/" + template_id);

        template = await response.json();
    } catch (error) {
        console.log(error);
    }
    return template;
}

export async function updateEmailTemplate(template_id, data) {

    try {
        const res = await fetch("http://127.0.0.1:3001/update/template/" + template_id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.status

    } catch (error) {
        console.log(error);
    }
}
export async function createEmailTemplate() {
    try {
        const res = await fetch("http://127.0.0.1:3001/add/template/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...freshTemplate,
                template_name: 'New Template',
            }),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function cloneEmailTemplate(data) {
    try {
        const res = await fetch("http://127.0.0.1:3001/add/template/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                counters:   data.counters,
                body: data.body,
                schemaVersion: data.schemaVersion,
                template_name: data.template_name + ' (#Duplicate)',
            }),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function listEmailTemplate() {
    let template;

    try {
        const response = await fetch("http://127.0.0.1:3001/templates");
        template = await response.json();
    } catch (error) {
        console.log(error);
    }
    return template[0];
}
