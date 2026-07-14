"use client"

import Link from "next/link";
import { useAuth } from "./hooks/useAuth";

type Props = {
  children: React.ReactNode;
};
export default function Home({ children }: Props) {
  const { isAuthenticated, role } = useAuth();
  console.log("Header isAuthenticated", isAuthenticated)
  return (
    <>
      <div className="min-h-screen flex bg-gradient-to-bl from-slate-900 via-zinc-700 to-blue-950">


        <div className="flex-1 flex flex-col">

          <header className="h-16 w-full bg-zinc-600/95 backdrop shadow-2xl shadow-blue/20 flex items-center justify-between px-4">
            <div className="relative md:ml-0 lg:ml-0">
              <h2 className="text-2xl font-bold text-white">
                Auth
              </h2>
            </div>
            <div className="auth-btn flex flex-wrap gap-2 md:flex-row">
              {
                isAuthenticated ? (
                  role === "ADMIN" ?
                    (
                      <Link href="/dashboard" className="border-white p-2 border-2 rounded-lg hover:cursor-pointer hover:bg-blue-950 transform transition-all ease-in-out delay-100">Dashboard</Link>
                    ) : (
                      <Link href="user-dashboard" className="border-white p-2 border-2 rounded-lg hover:cursor-pointer hover:bg-blue-950 transform transition-all ease-in-out delay-100"> Dashboard</Link>
                    )
                ) : (
                  <>
                    <Link href="/login" className="border-white p-2 border-2 rounded-lg hover:cursor-pointer hover:bg-blue-950 transform transition-all ease-in-out delay-100">Login</Link>
                    <Link href="/signup" className="border-white p-2 border-2 rounded-lg hover:cursor-pointer hover:bg-blue-950 transform transition-all ease-in-out delay-100">Signup</Link>
                  </>
                )
              }
            </div>
          </header>

          <main className="flex-1 p-4 text-white">
            {children}
          </main>

        </div>

      </div>
    </>
  );
}
