import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {useState,useEffect} from 'react'

import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Todo from './components/Todo/Todo'

function Routing() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.loggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      const user = { ...storedUser, loggedIn: true };
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (storedUser) {
      const user = { ...storedUser, loggedIn: false };
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(false);
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route  path='/' element={<Login handleLogin={handleLogin} loggedIn={loggedIn}/>} />  

          <Route path='/signup' element={<Signup/>} />

          <Route path='/todo' element={loggedIn ? (
                  <Todo handleLogout={handleLogout} />
                   ) : (
                   <Login handleLogin={handleLogin} loggedIn={loggedIn} />
                  )} /> 

        </Routes>
      </Router>
      
    </div>
  )
}

export default Routing
