/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let errorCritical;
    let xhrEnd;
    if (options.method === 'GET') {
        let xhr = new XMLHttpRequest();
        try {
            xhr.open('GET', `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
            xhr.withCredentials = true;
            xhr.send(); 
            xhrEnd = xhr;
        } catch (e) {
            errorCritical = e;
        }
    } else {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();

        formData.append('mail', options.data.mail);
        formData.append('password', options.data.password);
        try {
            xhr.open('POST', options.url);
            xhr.withCredentials = true;
            xhr.send(formData);
            xhrEnd = xhr;
        } catch (e) {
            errorCritical = e;
        }
    }
    // что делать с options.callback??
    xhr.onloadend = function() {
        if (xhr.status === 200) {
            options.callback(erorrCritical, xhr.response);
        } else {
            options.callback(errorCritical, xhr.response);
        }
    }
    return xhrEnd;
    
};
