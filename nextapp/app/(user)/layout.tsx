import ProtectedRoute from "@/protectedRoutes"
import React from "react"


type Props = {
    children: React.ReactNode
}

export default function UserLayout({ children }: Props) {
    return (
        <ProtectedRoute allowedRole="USER">

            <main>
                {children}

            </main>
        </ProtectedRoute>
    )
}