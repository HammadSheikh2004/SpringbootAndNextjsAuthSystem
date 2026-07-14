"use client"
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginValidationSchema } from "../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../lib/api";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess, setToken, setUser } from "../redux/slice/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginFormData>({ resolver: yupResolver(loginValidationSchema) })

  const router = useRouter();
  const dispatch = useDispatch();

  const getRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        router.replace("/dashboard");
        break;
      case "USER":
        router.replace("/user-dashboard");
        break;
      default:
        router.replace("/");
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data);
      console.log("Response Data: ", res);
      const token = res?.data?.token;
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      if (res?.data.token) {
        dispatch(loginSuccess({
          token,
          email: decoded.sub,
          registrationId: decoded.RegistrationId,
          role: decoded.Role,
          isAuthenticated: true,
        }));

        dispatch(
          setUser({
            registrationId: decoded.RegistrationId,
            email: decoded.sub,
            role: decoded.Role,
            userName: res.data.userName,
            isAuthenticated: true,
          })
        );
        dispatch(setToken(res.data.token));

        getRole(decoded.Role);
        alert("Login Successful");
        reset();
      } else {
        alert("Token missing in response");
      }

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 min-h-screen bg-gradient-to-bl from-slate-900 via-zinc-900 to-black">
        <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 text-white">
          <div className="text-center">
            <h2 className="my-2 text-3xl font-bold font-sans">Welcome To Login Form</h2>
            <p className="my-2 text-xl font-bold font-sans">Please Login!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            <button type="submit" disabled={isSubmitting} className=" w-30 h-10 border-2 rounded-xl my-2 hover:cursor-pointer">
              {isSubmitting ? "Submiting..." : "Signin"}
            </button>
          </form>
          <p className="text-center mt-4">Don't have an account? So <Link href="/signup">Signup</Link></p>
        </div>
      </div>
    </>
  );
}
