import logo from '../../assets/logo.png';
import './LoginPage.css';
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = async event => {
    event.preventDefault();

    // determinr the api endpoint based on the mode
    const endpoint = mode === 'login' ? '/api/user/login' : '/api/user/register';

    try {
      const response = await axios.post(endpoint, { email, password });
      const { token } = response.data;
      document.cookie = `jwt=${token}; Secure; SameSite=Strict; HttpOnly`; //storing jwt in HttpOnly cookie

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      // display incorrect email or password
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-wrapper">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <a className="site-name" href="/">Hidden Gems</a>
      </div>


      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h3>{mode === 'login' ? 'Login' : 'Sign Up'} with your email</h3>

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
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>

        </form>
      </div>

      <p className="switch-link">
        {mode === 'login' ? "Don't have an account yet? " : "Already have an account? "}
        <a href="#" className="switch-button" onClick={toggleMode}>
          {mode === 'login' ? 'Sign up' : 'Login'}
        </a>
      </p>

    </div>
  );
};