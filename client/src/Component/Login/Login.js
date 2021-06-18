import React, {useState, useContext} from 'react'
import {UserContext }from '../Context'
import axios from 'axios'
import NavBar from '../Nav/NavBar'

axios.defaults.withCredentials = true


function Login(props) {
  const {setData} = useContext(UserContext)
 
    const[login, setLogin] = useState({  email:'',  password:''})
  
   
    const handelChange = (e)=>{
        const {name,value} = e.target
        setLogin({...login,[name]:value})
      }
    
    
    const submit = async(e) => {
          e.preventDefault()
   try {
       const res = await  axios.post("http://localhost:7000/api/login" , login, {withCredentials:true})
      
     
       if(res){
         
       
       setData(res.data)
      
      //  localStorage.setItem('jwt_info',JSON.stringify(res))
        if(res.data.isAuth && res.data.role === 'admin') props.history.push('/admin')
        if(res.data.isAuth && res.data.role === 'user') props.history.push('/user')
        if(res.data.isAuth && res.data.role === 'technicien') props.history.push('/technicien')
      
    }
    
  

      
       
    
    } catch (error) {
        if(error) console.log(error.response);
    }


    }


    return (
        <>
        <NavBar/>
        <div className="container login">
             <div className="row justify-content-center">
                  <div className="col-lg-6 mt-4">
                  <h1>Login</h1>
                  {/* FORM */}
                  <form onSubmit={submit}>
                       <div className="form-group">
                       <label htmlFor="email" className="text-muted">Email</label>
                     <input onChange={handelChange} type="email" className="form-control   "  id='bg'name="email" />
                       </div>

                       <div className="form-group">
                       <label htmlFor="password" className="text-muted">Password</label>
                                         <input onChange={handelChange} type="password" className="form-control " id='bg' name="password" />
                       </div>

                       <button className="btn btn-lg btn-block btn-outline" id='bgg'>Login</button>
                  </form>
                  
                 
                  </div>
             </div>
        </div>
        </>
   )

   
  
    

 }


export default Login