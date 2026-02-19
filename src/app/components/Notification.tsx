'use client'

import { socket } from "@/socket"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react"

type NotificationType = {
    id: string,
    senderUserName: string,
    type: "like" | "comment" | "rePost" | "follow",
    link: string
}
const typeConfig = {
    like: {
        label: "liked your post",
        bg: "bg-red-500/20",
        icon: (className: string) => (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
            </svg>
        ),
    },

    comment: {
        label: "commented on your post",
        bg: "bg-blue-500/20",
        icon: (className: string) => (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                />
            </svg>
        ),
    },

    rePost: {
        label: "reposted your post",
        bg: "bg-green-500/20",
        icon: (className: string) => (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
                />
            </svg>
        ),
    },

    follow: {
        label: "followed you",
        bg: "bg-purple-500/20",
        icon: (className: string) => (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
        ),
    },
};


export const Notification = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([])
    const [open, setOpen] = useState(false)
    const [unread, setUnread] = useState(0)
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        socket.on("getNotification", (data: NotificationType) => {
            setNotifications(prev => [data, ...prev])
            setUnread(prev => prev + 1)
        })
        return () => { socket.off("getNotification") }
    }, [])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleOpen = () => {
        setOpen(prev => !prev)
        if (!open) setUnread(0)
    }

    const router = useRouter()

    const clearAll = () => setNotifications([])

    const handleClick =(notification:NotificationType)=>{
        const filteredList = notifications.filter(n=>n.id!==notification.id)
        setNotifications(filteredList)
        setOpen(false)
        router.push(notification.link)
    }

    return (
        <div className="relative" ref={panelRef}>
            {/* Bell Button */}
            <button
                onClick={handleOpen}
                className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4 cursor-pointer"
            >
                <div className="relative">
                    <Image
                        src={`/icons/notification.svg`}
                        alt="notification"
                        width={24}
                        height={24}
                    />
                    {unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {unread > 9 ? "9+" : unread}
                        </span>
                    )}
                </div>
                <span className="hidden xxl:inline">Notification</span>
            </button>

            {/* Floating Panel */}
            {open && (
                <div className="fixed left-64 top-auto w-80 bg-[#111] border border-[#2a2a2a] rounded-2xl shadow-2xl z-[999] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
                        <span className="text-white font-semibold text-sm">Notifications</span>
                        {notifications.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto divide-y divide-[#1e1e1e]">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <span className="text-3xl mb-2">🔔</span>
                                <span className="text-sm">No notifications yet</span>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <a
                                    key={n.id}
                                    href={n.link}
                                    onClick={()=>handleClick(n)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors"
                                >
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${typeConfig[n.type].bg}`}>

                                        {typeConfig[n.type].icon(
                                            "text-white opacity-80"
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">
                                            <span className="font-semibold">@{n.senderUserName}</span>
                                            {" "}
                                            <span className="text-gray-400">{typeConfig[n.type].label}</span>
                                        </p>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}