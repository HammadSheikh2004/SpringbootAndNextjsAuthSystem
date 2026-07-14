"use client"
import { Eye, EyeClosed } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormData, loginValidationSchema, SignupFormData, signupValidation } from '../utils/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  };
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupFormData>({ resolver: yupResolver(signupValidation), mode: "onChange" })
  const onSubmit = async (data: SignupFormData) => { 
    console.log(data);
    reset();
  };
  return (
    <>
      <div className="flex items-center justify-center p-4 min-h-screen bg-gradient-to-bl from-slate-900 via-zinc-900 to-black">
        <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 text-white">
          <div className="text-center">
            <h2 className="my-2 text-3xl font-bold font-sans">Welcome To Signup Form</h2>
            <p className="my-2 text-xl font-bold font-sans">Please Signup!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="userNameField">
              <input {...register('userName')} type="text" name="userName" placeholder="Enter User name" className="w-full border-white p-2 border-2 rounded-xl focus:outline-none my-2" />
              {errors.userName && <span className="text-red-500 my-2">{errors.userName.message}</span>}
            </div>
            <div className="emailField">
              <input {...register('email')} type="email" name="email" placeholder="Enter Email" className="w-full border-white p-2 border-2 rounded-xl focus:outline-none my-2" />
              {errors.email && <span className="text-red-500 my-2">{errors.email.message}</span>}
            </div>

            <div className="passwordField">
              <div className="relative">
                <input {...register('password')} type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" className="w-full border-white p-2 border-2 rounded-xl focus:outline-none my-2" />

                <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-3 text-white hover:text-white focus:outline-none hover:cursor-pointer ">
                  {showPassword ? (
                    <EyeClosed />
                  ) : (
                    <Eye />
                  )}
                </button>
              </div>
              {errors.password && <span className="text-red-500 my-2">{errors.password.message}</span>}
            </div>

            <div className="passwordField">
              <div className="relative">
                <input {...register('confirmPassword')} type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Enter Confirm Password" className="w-full border-white p-2 border-2 rounded-xl focus:outline-none my-2" />

                <button type="button" onClick={toggleConfirmPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 text-white hover:text-white focus:outline-none hover:cursor-pointer ">
                  {showConfirmPassword ? (
                    <EyeClosed />
                  ) : (
                    <Eye />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-red-500 my-2">{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting} className=" w-30 h-10 border-2 rounded-xl my-2 hover:cursor-pointer">
              {isSubmitting ? "Loading..." : "Signup"}
            </button>

          </form>
          <p className="text-center mt-4">Have an account? So <Link href="/login">Login</Link></p>
        </div>
      </div>
    </>
  )
}

export default Signup