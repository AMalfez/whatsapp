import React, { useState } from "react";
import "../css/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signin, setsignin] = useState('Sign Up')
  const [display, setdisplay] = useState('block')
  const [signup, setsignup] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = ()=>{
    setsignin('Login')
    setdisplay('none')
  }
  const newsignup = ()=>{
    setsignin('Sign Up')
    setdisplay('block')
  }

  const handleSignup = async(e) => {
    console.log(signup);
    e.preventDefault();

    if (signin === 'Sign Up') {
      await axios.post("http://localhost:5000/user/signup", signup).then((result)=>{
      if (result.data!=='taken') {
        alert('Signup succesfull! please login')
        navigate(`/whatsapp/${result.data[0]._id}`)
      } else{
        alert('User already exist')
      }
    })  
    } else{
      await axios.post("http://localhost:5000/user/login", signup).then((result)=>{
      if (result.data!=='noexist') {
        alert('Login succesfull!')
        navigate(`/whatsapp/${result.data[0]._id}`)
      } else{
        alert('user doesnot exists')
      }
    })
    }
    
  };
  return (
    <div className="signup">
      <h1 style={{marginTop:'13%'}}>{signin}</h1>
      <form>
        <span style={{width:'95%',marginTop: '5%', display:display}}><input
        type="text"
          placeholder="Enter Username"
          value={signup.username}
          onChange={(e) => {
            setsignup({ ...signup, username: e.target.value });
          }}
        /></span>
        <br/>
        <span style={{width:'95%'}}><input
          type="email"
          placeholder="Enter email"
          value={signup.email}
          onChange={(e) => {
            setsignup({ ...signup, email: e.target.value });
          }}
        />
        <br/>
        </span>
        <br/>
        <span style={{width:'95%'}}><input
          type="password"
          placeholder="Password"
          value={signup.password}
          onChange={(e) => {
            setsignup({ ...signup, password: e.target.value });
            console.log(signup);
          }}
        /></span>
        <br/>
        <button type="submit" onClick={handleSignup}>
          Submit
        </button>
      {signin === 'Sign Up' ? (<p className="login__text" onClick={login}>Already a member? Login</p>):(<p className="login__text" onClick={newsignup}>Not a member? Signup</p>)}
      </form>
    </div>
  );
}

export default Signup;
