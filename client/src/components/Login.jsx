import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import axios from 'axios'

import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

// This is login Page
const Login = () => {
  const [state, setState] = useState("Login");

  const { setShowLogin,backendUrl ,setToken,setUser} = useContext(AppContext);


  const [name,setName]=useState('')

  const [email,setEmail]=useState('')

  const [password,setPassword]=useState('')

  const onSubmitHandler=async(e)=>{

    e.preventDefault()

    try{

      if(state==='Login'){
          
        const {data} = await axios.post(backendUrl+'/api/user/login',{email,password})

        if(data.success){

          setToken(data.token)

          setUser(data.user)

          localStorage.setItem('token',data.token)

          setShowLogin(false)


        }

        else{
              toast.error(data.message)

        }
      }

      else{
              
        const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password})

        if(data.success){

          setToken(data.token)

          setUser(data.user)

          localStorage.setItem('token',data.token)

          setShowLogin(false)


        }

        else{
              toast.error(data.message)

        }
      }
    }
    catch(error){

      toast.error(error.message)


    }

  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form

        onSubmit={onSubmitHandler}

        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        {" "}
        {/* Everything comes under a Form Element*/}
        <h1 className="text-center text-2xl text-nuetral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back!! Please {state} to contine</p>
        {/* This div is for Your Name */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />

          <input
             onChange={e=>setEmail(e.target.value)} value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Enter your Email Id "
            required
          />
        </div>
        {/* This div is for email sign up  */}
        {state !== "Login" && (
          <div className="border   px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img
              className="opacity-50"
              width={30}
              src={assets.profile_icon}
              alt=""
            />

            <input

              onChange={e=>setName(e.target.value)} value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Enter your name "
              required
            />
          </div>
        )}
        {/* This div is for Your Password entry   */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" />

          <input
           onChange={e=>setPassword(e.target.value)} value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <p className="text-sm text-gray-800 my-4 cursor-pointer ">
          Forget Password?
        </p>
        <button className="cursor-progress w-full p-2 rounded-full hover:scale-110 text-white transition-all duration-[1s]  bg-black">
          {state === "Login" ? "login" : "create"}{" "}
        </button>
        {state === "Login" ? (
          //for creating New Account purpose
          <p className="mt-5 text-center">
            Don't have an account ?{" "}
            <span
              className=" cursor-pointer text-orange-400"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>{" "}
            With us
          </p>
        ) : (
          //for Login purpose
          <p className="mt-5 text-center">
            Got a Account ! So Sweet, Please{" "}
            <span
              className=" cursor-pointer text-orange-400"
              onClick={() => setState("Login")}
            >
              Login
            </span>{" "}
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute  top-5 right-5 cursor-pointer"
          alt=""
        />
      </motion.form>
    </div>
  );
};

export default Login;
