import React, { useState } from "react";

import myaxios from "../Helper/MyAxios";

const Login =(prop)=>
{
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [errormesage,seterrormessage]=useState('')
    const login=()=>{
        myaxios.post("http://localhost:4000/users/authenticate", {
            username: username,
            password: password
          })
          .then((response) => {
              console.log(response.status)
              if(response.status===200){
                myaxios.interceptors.request.use(
                config=>{
                    config.headers['Authorization']=`bearer ${response.data.token}`
                    return config;
                })                
            //    myaxios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                console.log(response.data.token)
               prop.callback(true);
              }
              else{
                prop.callback(false);
                seterrormessage("enter correct message");
              }

            
        
           // console.log(response);
          }).catch(
            function (error) {
                prop.callback(false);
                seterrormessage("Enter Correct Details");
              console.log('Show error notification!')
            //   return Promise.reject(error)
            });
    }
    const handleChange = (e) => {
        // 👇 Store the input value to local state
        setusername(e.target.value);
      };
      const handlepassword = (e) => {
        // 👇 Store the input value to local state
        setpassword(e.target.value);
      };
    return (
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div>
         <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" onChange={handleChange} value={username} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input value={password} onChange={handlepassword} type="password"  class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div class="form-group form-check">
                <input  type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label  class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" onClick={login} class="btn btn-primary">Submit</button>
            <lable >{errormesage}</lable>
            </div>
        </div>
    )
}
export default Login;