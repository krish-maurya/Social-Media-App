"use client"
import { Post as PostType } from "@/generated/prisma/client";
import ImageComponent from "./ImageComponent";
import Post from "./Post";
import { useUser } from "@clerk/nextjs";
import { useActionState, useEffect } from "react";
import { addComments } from "@/action";
import { socket } from "@/socket";

type CommentsWithDEtails = PostType & {
  user: {
    username: string;
    displayName: string | null;
    avatar: string | null;
  };
  likes: { id: string }[]
  _count: { likes: number, rePostedBy: number, comments: number }
  bookmarks: { id: string }[]
  rePostedBy: { id: string }[]
}

const Comments = ({ comments, postId, username }: { comments: CommentsWithDEtails[], postId: string, username: string }) => {
  const {  user } = useUser()

  const [state, formAction, isPending] = useActionState(addComments, { success: false, error: false })

  useEffect(() => {

    if (state.success) {
      socket.emit("sendNotification", {
        receiveUsername: username,
        data: {
          senderUserName: user?.username,
          type: "comment",
          link: `/${username}/status/${postId}`
        }

      })
    }
  }, [state.success,username,postId])
  return (
    <div className="">
      {user && <form action={formAction} className="flex items-center justify-between gap-4 p-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden -z-10">
          <ImageComponent src={user?.imageUrl} alt="Lama Dev" width={100} height={100} tr={true} />
        </div>
        <input type="text" name="desc" className="flex-1 bg-transparent outline-none p-2 text-xl" placeholder="Post your reply!" />
        <input type="string" name="postId" hidden readOnly value={postId} />
        <input type="string" name="username" hidden readOnly value={username} />
        <button disabled={isPending} className="py-2 px-4 font-bold bg-white text-black rounded-full disabled:cursor-not-allowed disabled:bg-slate-200">{isPending ? "Replying" : "Reply"}</button>
      </form>}
      {state.error && (<span className="text-red-300 p-4 ">Something wents wrong!</span>)}
      {comments.map(comment => <div key={comment.id}>
        <Post type="comment" post={comment} />
      </div>)}
    </div>
  );
};

export default Comments;