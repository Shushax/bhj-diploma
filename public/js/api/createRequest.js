/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let errorCritical;
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    if (options.method === 'GET') {
        try {
            xhr.open('GET', options.url);
            xhr.withCredentials = true;
            xhr.responseType = options.responseType; 
        } catch (e) {
            errorCritical = e;
            options.callback(erorrCritical, xhr.response);
        }
    } else {
        
        for (let option in options.data) {
            formData.append(`${option}`, options.data[option]);
        }

        try {
            xhr.open('POST', options.url);
            xhr.withCredentials = true;
            xhr.responseType = options.responseType;
        } catch (e) {
            errorCritical = e;
            options.callback(erorrCritical, xhr.response);
        }
    }

    xhr.send(formData);
    
    xhr.onloadend = function() {
        if (xhr.status === 200 && xhr.response.success == true) {
            options.callback(erorrCritical, xhr.response);
        } else {
            options.callback(errorCritical, xhr.response);
        }
    }
    
};
