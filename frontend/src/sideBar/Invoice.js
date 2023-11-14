 export default  function Invoice (){
    return (
      <div className="invoice_box">
        <h1>Registration form </h1>
        <label><span>*</span>Name :</label> <br></br>
        <input placeholder="Enter Name"type="text"></input> <br></br>
        <label> <span>*</span>Email : </label> <br></br>
        <input placeholder="Enter Email" type="email"></input> <br></br>
        <label> <span>*</span>Mobile Number : </label> <br></br>
        <input placeholder="Enter Mobile Number"type="number"></input> <br></br>
        <label> <span>*</span>Country :</label> <br></br>
        <input placeholder="Enter Country Name" type="text"></input> <br></br>
        <label> <span>*</span>Address : </label> <br></br>
        <input placeholder="Enter Address" type="text"></input> <br></br>
        <label> <span>*</span>Pincode : </label> <br></br>
        <input placeholder="Enter Pincode"type="number"></input> <br></br>
        <br></br>
       <div>
          <button> <a style={{ cursor: 'pointer' }}>SignUp</a></button> 
        </div>
      </div>
    );
}