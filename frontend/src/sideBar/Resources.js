import React, { useState } from "react";



export default  function Invoice (){
  const [name,setName] = useState("")
   
  const data = {
    name : name,
    

  }

const HandleSignUp = async ()=>{
  console.log(name);
   let result = await fetch("http://localhost:4040/resources/signup", {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "content-type": "application/json",
     },
   });
    result = await result.json()
    console.log(result);
}

    return (
      <div className="invoice_box">
        <h1>Registration form </h1>
        
        <label><span>*</span>Name :</label> <br></br>
        <input placeholder="Enter Name" type="text" value={name} onChange={(e)=>setName(e.target.value)}></input> <br></br>

        <label> <span>*</span>Email : </label> <br></br>
        <input placeholder="Enter Email" type="email"></input> <br></br>
        <label> <span>*</span>Official Email : </label> <br></br>
        <input placeholder="Enter Official Email" type="email"></input> <br></br>
        <label> <span>*</span>Mobile Number : </label> <br></br>
        <input placeholder="Enter Mobile Number"type="number" ></input> <br></br>
         <label> <span>*</span>Password : </label> <br></br>
        <input placeholder="Enter Strong Password" type="password"></input> <br></br>
        <label> <span>*</span>Country :</label> <br></br>
        <input placeholder="Enter Country Name" type="text"></input> <br></br>
        <label> <span>*</span>Address : </label> <br></br>
        <input placeholder="Enter Address" type="text"></input> <br></br>
        <label> <span>*</span>Pincode : </label> <br></br>
        <input placeholder="Enter Pincode"type="number"></input> <br></br>
         <label> <span>*</span>Other Mobile Number : </label> <br></br>
        <input placeholder="Enter Mobile Number" type="number"></input> <br></br>
        <br></br>
       <div>
          <button type="button" onClick={HandleSignUp} > <a style={{ cursor: 'pointer' }}>SignUp</a></button> 
        </div>
      </div>
    );
}