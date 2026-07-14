"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { setUser } from "../redux/slice/authSlice";
import Loader from "../components/Loader";

type Props = {
  children: React.ReactNode;
};

export default function SessionInitializer({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Server timeout, redirecting...");
      router.replace("/");
    }, 8000); // 8 seconds

    const init = async () => {
      try {
        const res = await api.get("/api/auth/me");

        clearTimeout(timeout);

        dispatch(
          setUser({
            email: res.data.data.email,
            registrationId: res.data.data.registrationId,
            role: res.data.data.role,
            userName: res.data.data.userName,
            isAuthenticated: true,
          })
        );
      } catch (err) {
        console.log("No session");

        clearTimeout(timeout);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => clearTimeout(timeout);
  }, [dispatch, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}