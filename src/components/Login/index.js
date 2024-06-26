import React, {  useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import './index.css';
import { UserDetailsContext } from '../../Context';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
 
  const history = useNavigate(); 
  const user=useContext(UserDetailsContext)
 
  

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };
  
  

  const onSubmitSuccess = jwtToken => {
    localStorage.setItem("userName", username)
    user.update_user_name()
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    
    
    history('/'); 
  };

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };
  
 

  




  const submitForm = async event => {
    event.preventDefault();

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      

      if (!response.ok) {
        throw new Error("Username or password is invalid");
      }

      const data = await response.json();
      onSubmitSuccess(data.token);

      console.log(data);
    } catch (error) {
      
     
      onSubmitFailure(error.message);
    }
  };


  








  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  
  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken !== undefined) {
    history('/'); 
  }

  return (
    
   
      
    <div className="login-form-container">
      <img
        src="https://images.moneycontrol.com/static-mcnews/2022/10/online-retail.jpg"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div> 

  );
};

export default Login;
