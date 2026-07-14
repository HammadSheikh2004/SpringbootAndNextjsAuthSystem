"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Loader from "./app/components/Loader";

type Props = {
  children: React.ReactNode;
  allowedRole: "ADMIN" | "USER";
};

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const router = useRouter();
  const { role } = useAuth();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (role === undefined || role === null) return;

    if (role !== allowedRole) {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [role, allowedRole, router]);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}