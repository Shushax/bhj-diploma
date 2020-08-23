/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let errorCritical;
    if (options.method === 'GET') {
        let xhr = new XMLHttpRequest();
        try {
            xhr.open('GET', options.url);
            xhr.withCredentials = true;
            xhr.responseType = options.responseType;
            xhr.send(); 
        } catch (e) {
            errorCritical = e;
            options.callback(erorrCritical, xhr.response);
        }
    } else {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        
        for (let option in options.data) {
            formData.append(`${option}`, options.data[option]);
        }

        try {
            xhr.open('POST', options.url);
            xhr.withCredentials = true;
            xhr.responseType = options.responseType;
            xhr.send(formData);
        } catch (e) {
            errorCritical = e;
            options.callback(erorrCritical, xhr.response);
        }
    }
    
    xhr.onloadend = function() {
        if (xhr.status === 200 && xhr.response.success == true) {
            options.callback(erorrCritical, xhr.response);
        } else {
            options.callback(errorCritical, xhr.response);
        }
    }
    
};
