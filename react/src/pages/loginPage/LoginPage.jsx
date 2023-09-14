import logo from '../../assets/logo.png';
import './LoginPage.css';
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async event => {
    event.preventDefault();
  };

  const word = "Sign up";

  return (
    <div className="login-wrapper">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <a className="site-name" href="/">Hidden Gems</a>
      </div>


      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h3>{word} with your email</h3>

          <GoogleOAuthProvider clientId="<your_client_id>">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /></GoogleOAuthProvider>

          <h4>or</h4>

          <div className="login-input">
            <input
              required
              className='input-field'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input">
            <input
              required
              className='input-field'
              type='password'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">
            {word}
          </button>
        </form>
      </div>
      {/* <p className="switch-link">
        Don't have an account yet? <a href="#">Sign up</a>
      </p> */}
      <p className="switch-link">
        Already have an account? <a href="#">Log in</a>
      </p>

    </div>
  );
};