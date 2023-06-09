import {Link, useNavigate } from 'react-router-dom'
import './login.css'
import { useState } from 'react';


  interface Props {
    handleLogin: (email: string, password: string) => void;
    loggedIn: boolean;
  }

  const Login = ({ handleLogin, loggedIn }: Props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleLogin(username, password);
      navigate('/todo');
    }
  
    if (loggedIn) {
      return <p>You are already logged in!</p>;
    }


  return (
    <div className='login'>
      <div className="login-div">
      <h1>Login In</h1>
        <form className='form' onSubmit={handleSubmit}>  
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />   
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <button type='submit' className="login-btn">Login</button>
          
        </form>
         <Link to='/signup' style={{ textDecoration: 'none' }}><p className='p-login' >SignUp?</p></Link>
        {/* onClick={()=>{navigate('./signup')} */}
        
      </div>
    </div>
  )
}

export default Login
