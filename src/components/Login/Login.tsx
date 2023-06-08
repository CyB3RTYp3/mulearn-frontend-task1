import { useNavigate } from 'react-router-dom'
import './login.css'
import { useState } from 'react';


  interface Props {
    handleLogin: (email: string, password: string) => void;
    loggedIn: boolean;
  }

  const Login = ({ handleLogin, loggedIn }: Props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleLogin(email, password);
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
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
        <a onClick={()=>{navigate('./signup')}} >SignUp?</a>
        
      </div>
    </div>
  )
}

export default Login
