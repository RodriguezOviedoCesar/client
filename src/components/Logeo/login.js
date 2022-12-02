import './Login.css'
import   {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { Diferenciador, UsersLogin } from '../../Services/authService';


export default function Login(){ 
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await UsersLogin(user);
    //console.log(response.data);
    setUser({
      username: '',
      password: ''
    })
    Diferenciador(response.data.user.type);
  }

  return(
    <div id='div'>
      <div id='div1'>
      <form onSubmit={handleSubmit} id='form'>
                <h3>Ingresar</h3>

                <div className="form-group">
                    <label>User</label>
                    <input onChange={handleChange} value={user.username} name='username' style={{marginTop:'10px', marginBottom:'10px'}} type="text" className="form-control" placeholder="Ingrese Username" required></input>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handleChange} value={user.password} name='password' style={{marginTop:'10px', marginBottom:'10px'}} type="password" className="form-control" placeholder="Ingrese password" required></input>
                </div>
                

                <div id="button">
                  
                  <button type="submit" className="btn btn-primary btn-block">Submit</button>
                  
                </div>
    </form>
      </div>
    </div>
  );
};
