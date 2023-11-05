import React, { Component } from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterationForm from '../../components/RegisterationForm/RegisterationForm';

import loginAside from '../../assets/images/login-aside.svg';
import './IndexPage.css';

class IndexPage extends Component {

  state = {
    signUpSectionInView: false,
    loginSectionInView: false
  }

  componentDidMount() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('loan-form');
    localStorage.removeItem('user_id');


    let elements;
    let windowHeight;
    const init = () => {
      elements = [
        {
          ref: this.signUpSection,
          currentState: this.state.signUpSectionInView,
          stateChange: {
            signUpSectionInView: true
          }
        },
        {
          ref: this.loginSection,
          currentState: this.state.loginSectionInView,
          stateChange: {
            loginSectionInView: true
          }
        }
      ];
      windowHeight = window.innerHeight;
      fadeInAnimationHandler();
      checkPosition();
    }
    const fadeInAnimationHandler = () => {
      window.addEventListener('scroll', checkPosition);
      window.addEventListener('resize', init);
    }
    const checkPosition = () => {
      for (let i = 0; i < elements.length; i++) {
        let positionFromTop = elements[i].ref.getBoundingClientRect().top;
        if (positionFromTop - windowHeight <= 0 && !elements[i].currentState) {
          elements[i].currentState = this.state.signUpSectionInView;
          this.setState(elements[i].stateChange);
        }
      }
    }
    init();
  }

  render() {
    return (
      <>
        <div className="strech-full-width-banner"></div>
        <section id="signup" className={
          `section-container ${this.state.signUpSectionInView ? 'fadeIn fadeIn-first' : 'hidden'}`
        }
          ref={(input) => this.signUpSection = input}>
          <div className="section-form">
            <RegisterationForm inView={this.state.signUpSectionInView} />
          </div>
          <div className="section-content has-text-white">
            <p className="is-size-3 has-text-centered">
              Aplicá por un préstamo en pocos pasos
        </p>
            <ol className="signup-content">
              <li>Registrate / Inicia Sesion</li>
              <li>Entra al dashboard y seleccioná "Aplicar"</li>
              <li>Completá con tus datos</li>
              <li>Y listo!</li>
            </ol>
          </div>
        </section>
        <section id="login" className={
          `section-container ${this.state.loginSectionInView ? 'fadeIn fadeIn-first' : 'hidden'}`
        }
          ref={(input) => this.loginSection = input}>
          <div className="section-content section-content-login-form">
            <div className="login-aside">
              <img src={loginAside}
                className="svg-update"
                alt="login aside main graphics" />
              <p>Banco diseñado para humanos</p>
            </div>
          </div>
          <div className="section-form">
            <LoginForm inView={this.state.loginSectionInView} />
          </div>
        </section>
      </>
    )
  }
}


export default IndexPage;
