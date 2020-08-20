/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    if (options.method === 'GET') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
        xhr.withCredentials = true;
        xhr.send();
    } else {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();

        formData.append('mail', options.data.mail);
        formData.append('password', options.data.password);
        xhr.open('POST', options.url);
        xhr.withCredentials = true;
        xhr.send(formData);
    }
    // что делать с options.callback??
    xhr.onload = function() {
        if (xhr.status === 200) {
            options.callback(err, xhr.response);
        } else {
            const error = new Error('Ошибка!')
            options.callback(error, xhr.response);
        }
    }
};
