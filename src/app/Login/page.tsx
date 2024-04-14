"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Header from "../Components/Header";
import { trpc } from "~/utils/trpc";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleClick = () => {
    if (isSignUp) {
      const data = { name, email, password };
      registerFn(data);
    } else {
      const data = { email, password };
      loginFn(data);
    }
  };

  const { mutate: registerFn } = trpc.registerUser.useMutation({
    onError(error: any) {
      setError(error.message);
      setName("");
      setEmail("");
      setPassword("");
    },

    onSuccess() {
      const data = { email, password };
      loginFn(data);
      alert("Successfully registered!!")
    },
  });

  const { mutate: loginFn } = trpc.loginUser.useMutation({
    onError(error: any) {
      setError(error.message);
      setEmail("");
      setPassword("");
    },

    onSuccess(data: any) {
      localStorage.setItem("token", data.token);
      getUserFun({ email });
    },
  });

  const { mutate: getUserFun } = trpc.getUser.useMutation({
    onSuccess(data: any) {
      if (isSignUp) {
        router.push(`/Verify/${data.data.user?.id}`);
      } else {
        router.push(`/Interests/${data.data.user?.id}`);
      }
    },
  });

  return (
    <div>
      <Header />
      <div className="mb-20 flex justify-center">
       {
        isSignUp ? (<div className="mt-7 w-[40%] rounded-xl border border-solid border-gray-300">
        <div className="p-5 text-center">
          <h1 className="text-xl font-bold">
            Create your account
          </h1>
        </div>
          <div className="my-4 ml-5">
            <p className="my-1">Name</p>
            <input
              className="h-8 w-[95%] rounded-md border border-solid border-gray-300 p-4"
              type="text"
              placeholder="Enter"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        <div className="my-4 ml-5">
          <p className="my-1">Email</p>
          <input
            className="h-8 w-[95%] rounded-md border border-solid border-gray-300 p-4"
            type="text"
            placeholder="Enter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-4 ml-5">
          <p className="my-1">Password</p>
          <input
            className="h-8 w-[95%] rounded-md border border-solid border-gray-300 p-4"
            type={inputType}
            placeholder="Enter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />  
          <p className="text-red-500">{error}</p>
        </div>
        <button
          onClick={handleClick}
          className="my-4 ml-5 w-[92%] rounded-md border border-solid border-gray-300 bg-black p-2 text-white"
        >
         CREATE ACCOUNT 
        </button>
        <p className="mb-20 ml-5 mt-4 text-center">
             <>
              Have an Account?
              <span
                className="ml-2 cursor-pointer font-semibold"
                onClick={toggleSignUp}
              >
                LOGIN
              </span>
            </>
        </p>
      </div>) : (<div className="mt-7 w-[40%] rounded-xl border border-solid border-gray-300">
          <div className="p-5 text-center">
            <h1 className="text-xl font-bold">
             Login
            </h1>
          </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold">
                Welcome back to ECOMMERCE
              </h1>
              <p className="text-sm">The next gen business marketplace</p>
            </div>
          <div className="my-4 ml-5">
            <p className="my-1">Email</p>
            <input
              className="h-8 w-[95%] rounded-md border border-solid border-gray-300 p-4"
              type="text"
              placeholder="Enter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4 ml-5">
            <p className="my-1">Password</p>
            <input
              className="h-8 w-[95%] rounded-md border border-solid border-gray-300 p-4"
              type={inputType}
              placeholder="Enter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={togglePasswordVisibility}
              className="relative bottom-7 left-[80%] px-2 underline"
            >
             Show
            </button>

            <p className="text-red-500">{error}</p>
          </div>

          <button
            onClick={handleClick}
            className="my-4 ml-5 w-[92%] rounded-md border border-solid border-gray-300 bg-black p-2 text-white"
          >
            {isSignUp ? "CREATE ACCOUNT" : "LOGIN"}
          </button>
          <p className="mb-20 ml-5 mt-4 text-center">
              <>
                Don't have an Account?
                <span
                  className="ml-2 cursor-pointer font-semibold"
                  onClick={toggleSignUp}
                >
                  SIGN UP
                </span>
              </>
          </p>
        </div>)
       }
       
       
      </div>
    </div>
  );
};

export default Login;
