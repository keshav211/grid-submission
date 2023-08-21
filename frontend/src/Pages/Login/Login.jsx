import React, { useState } from 'react';
import '../LoginSignupPage.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const handleLogin =async (e) => {
    e.preventDefault();
    console.log(email,password)
    try{
      const res = await fetch("http://localhost:6001/api/user/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,password
        })
      });
      const data = await res.json();
      if(data.status==='success'){
        navigate("/dashboard");
        console.log(data);
      }
      else{
        window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
      }
    }
    catch(err){
      console.log(err);
    }
    
  };
  return (
    <div className="container">
      <div className="login-signup-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>          
          {/* <button onClick={navigate("/register")}>Signup</button> */}

        </form>
      </div>
    </div>
  );
};

export default LoginPage;