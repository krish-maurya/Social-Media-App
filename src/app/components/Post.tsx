import { resolve } from "path";
import ImageComponent from "./ImageComponent";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";
import { rejects } from "assert";
import { imagekit } from "@/Utils";
import VideoComponent from "./VideoComponent";
import Link from "next/link";
import { Post as PostType } from "@/generated/prisma/client";
import { format } from "timeago.js";



type PostWithDetails = PostType & {
    user: {
        username: string;
        displayName: string | null;
        avatar: string | null;
    };
    rePost?: (PostType & {
        user: {
            username: string;
            displayName: string | null;
            avatar: string | null;
        },
        _count: { likes: number, rePostedBy: number, comments: number },
        likes: { id: string }[]
        rePostedBy: { id: string }[]
        bookmarks: { id: string }[]
    }) | null;
    likes: { id: string }[]
    _count: { likes: number, rePostedBy: number, comments: number }
    bookmarks: { id: string }[]
    rePostedBy: { id: string }[]
};


const Post = ({ type, post }: { type?: "status" | "comment", post: PostWithDetails }) => {

    const originalPost = post.rePost || post;

    return (
        <div className="p-4 border-y-[1px] border-borderGray">
            {/* POST TYPE */}
            {post.rePostId &&
                <div className="flex items-center gap-2 text-sm text-textGray mb-2 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path
                            fill="#71767b"
                            d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
                        />
                    </svg>
                    <span>{post.user.displayName} reposted</span>
                </div>
            }
            {/* POST CONTENT */}
            {/* <div className="flex gap-4"> */}
            <div className={`flex gap-4 ${type === "status" && "flex-col"}`}>
                {/* AVATAR */}
                {originalPost.user.avatar && <div className={`${type === "status" && "hidden"} relative w-10 h-10 rounded-full overflow-hidden`}>
                    <ImageComponent src={originalPost.user.avatar} alt="" width={100} height={100} tr={true} />
                </div>}
                {/* CONTENT */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* TOP */}
                    <div className="w-full flex justify-between">
                        <Link href={`/${originalPost.user.username}`} className="flex gap-4">
                            <div className={`${type !== "status" && "hidden"} relative w-10 h-10 rounded-full overflow-hidden`}>
                                <ImageComponent src="general/avatar.png" alt="" width={100} height={100} tr={true} />
                            </div>
                            <div className={`flex items-center gap-2 flex-wrap ${type === "status" && "flex-col gap-0 !items-start"} `}>
                                <h1 className="text-md font-bold">{originalPost.user.displayName}</h1>
                                <span className={`text-textGray ${type === "status" && "text-sm"} `}>@{originalPost.user.username}</span>
                                {type !== "status" && (<span className="text-textGray">{format(originalPost.createdAt)}</span>)}
                            </div>
                        </Link>
                        <PostInfo />
                    </div>
                    {/* TEXT & MEDIA */}
                    <Link href={`/${originalPost.user.username}/status/${originalPost.id}`}>
                        <p className={`${type === "status" && "text-lg"}`}>
                            {originalPost.desc}</p>
                    </Link>
                    {originalPost.img &&
                        <ImageComponent src={originalPost.img} alt="Post image" width={600} height={600} />}
                    {type === "status" && (<span className="text-textGray">1 day ago</span>)}
                    <PostInteraction count={originalPost._count}
                        isLiked={!!originalPost.likes.length}
                        isSaved={!!originalPost.bookmarks.length}
                        isReposted={!!originalPost.rePostedBy.length} />
                </div>
            </div>
        </div >
    );
}

export default Post