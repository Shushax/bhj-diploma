/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    let form = document.getElementById('register-form');
    let btn = document.getElementsByClassName('btn-primary');
    User.register(options, () => callback = f => f);
    form.reset();
    App.setState('user-logged');
    Modal.onСlose(form);
  }
}
