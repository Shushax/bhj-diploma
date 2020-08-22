/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.clear();
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let currentUser = JSON.parse(localStorage.user);
    return currentUser;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    createRequest(data);
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${options.url}/current`);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          if (xhr.response.success == true) {
            User.setCurrent(xhr.response.user);
          } else {
            User.unsetCurrent(xhr.response.user);
          }
        }
      }
    }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login (data, callback = f => f) {
    createRequest(data);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${options.url}/login`);
    let formData = new FormData();
    for (let option in data) {
      formData.append(`${option}`, data[option]);
    }
    xhr.send(formData);
    if (xhr.status == 200) {
      if (xhr.response.success == true) {
        User.setCurrent(xhr.response.user);
      }
    }
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    createRequest(data);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${options.url}/register`);
    let formData = new FormData();
    for (let option in data) {
      formData.append(`${option}`, data[option]);
    }
    xhr.send(formData);
    if (xhr.status == 200) {
      if (xhr.response.success == true) {
       User.setCurrent(xhr.response.user);
      }
    }  
  }
  

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    createRequest(data);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${options.url}/logout`);
    let formData = new FormData();
    for (let option in data) {
      formData.append(`${option}`, data[option]);
    }
    xhr.send(formData);
    if (xhr.status == 200) {
      if (xhr.response.success == true) {
       User.unsetCurrent();
      }
    }  
  }
}
