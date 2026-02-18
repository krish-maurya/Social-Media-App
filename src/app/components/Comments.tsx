import { Post as PostType } from "@/generated/prisma/client";
import ImageComponent from "./ImageComponent";
import Post from "./Post";

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
  return (
    <div className="">
      <form className="flex items-center justify-between gap-4 p-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <ImageComponent src="general/avatar.png" alt="Lama Dev" width={100} height={100} tr={true} />
        </div>
        <input type="text" className="flex-1 bg-transparent outline-none p-2 text-xl" placeholder="Post your reply!" />
        <button className="py-2 px-4 font-bold bg-white text-black rounded-full">Reply</button>
      </form>
      {comments.map(comment => <div key={comment.id}>
        <Post type="comment"  post={comment} />
      </div>)}
    </div>
  );
};

export default Comments;