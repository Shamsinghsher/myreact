import React, { useState } from "react";
import myaxios from "../Components/Helper/MyAxios"
import  Login from "../Components/User/Login"

const Layout=()=>
{
    const [userdata,setuserdata]=useState([])
    function showuserdetail(show)
    {
        if(show)
        {
            myaxios.get("/users").then((response)=>{
            setuserdata(response.data);
        })
    }
    }
 return(
     <div>
         <Login  callback={showuserdetail}/>
         <div>
        {
            userdata.map((node,key)=>
            {
                return (<div>
                    <li>
                     
                        <ui >{node.firstName}</ui>
                        <ui>{node.lastName}</ui>
                        <ui>{node.username}</ui>
                    </li>
                </div>)
            })
        }
        </div>
     </div>
 )
}
export default Layout;