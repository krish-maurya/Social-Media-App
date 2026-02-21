"use client"
import { User } from "@/generated/prisma/client"
import { createContext, useContext } from "react"

const UserContext = createContext<User | null>(null)

export const UserProvider = ({ user, children }: { user: User|null, children: React.ReactNode }) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser  = () => useContext(UserContext)