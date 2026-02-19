"use client"

import { followUser } from "@/action"
import { useOptimistic, useState } from "react"

export const FollowButton = ({ userId, isFollowed }: { userId: string, isFollowed: boolean }) => {

    const [state, setState] = useState(isFollowed)

    const followAction = async () => {
        SwitchoptimisticFollow("");
        await followUser(userId);
        setState((prev) => !prev)
    }

    const [optimisticFollow, SwitchoptimisticFollow] = useOptimistic(state, (prev => !prev))

    return (
        <form action={followAction}>
            <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
                {optimisticFollow ? "Unfollow" : "Follow"}
            </button>
        </form>
    )
}
