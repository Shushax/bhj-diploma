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
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.user);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = (err, response) => {
    if (response.success == true) {
      User.setCurrent(response.user);
    } else {
      User.unsetCurrent();
    }
  }) {
    let options = {data: data, url: `http://localhost:8000${this.URL}/current`, method: `GET`, responseType: 'json', callback: callback};
    createRequest(options);
    }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login (data, callback = (err, response) => {
    if (response.success == true) {
      User.setCurrent(response.user);
    }
  }) {
    let options = {data: data, url: `http://localhost:8000${this.URL}/login`, method: `POST`, responseType: 'json', callback: callback};
    createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = (err, response) => {
    if (response.success == true) {
      User.setCurrent(response.user);
    }
  }) {
    let options = {data: data, url: `http://localhost:8000${this.URL}/register`, method: `POST`, responseType: 'json', callback: callback};
    createRequest(options);
  }
  

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = (err, response) => {
    if (response.success) {
      User.unsetCurrent();
     }
  }) {
    let options = {data: data, url: `http://localhost:8000${this.URL}/logout`, method: `POST`, responseType: 'json', callback: callback};
    createRequest(options);
  }
}
