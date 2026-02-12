import { resolve } from "path";
import ImageComponent from "./ImageComponent";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";
import { rejects } from "assert";
import { imagekit } from "@/Utils";
import VideoComponent from "./VideoComponent";

interface FileDetailsResponse {
    width: number,
    height: number,
    filePath: string,
    url: string,
    fileType: string,
    customMetadata?: {
        sensitive: boolean,
    }
}

const Post = async () => {

    const getFileDetails = async (fileId: string): Promise<FileDetailsResponse> => {
        return new Promise((resolve, reject) => {
            imagekit.getFileDetails(fileId, (err, result) => {
                if (err) {
                    console.error("Error getting file details:", err);
                    reject(err);
                } else {
                    console.log("File details:", result);
                    resolve(result as FileDetailsResponse);
                }
            });
        });
    };

    const fileDetails = await getFileDetails("698d93775c7cd75eb8ea8313");
    console.log(fileDetails)
    return (
        <div className="p-4 border-y-[1px] border-borderGray">
            {/* POST TYPE */}
            <div className="flex items-center gap-2 text-sm text-textGray mb-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path
                        fill="#71767b"
                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
                    />
                </svg>
                <span>Lama Dev reposted</span>
            </div>
            {/* POST CONTENT */}
            <div className="flex gap-4">
                {/* AVATAR */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <ImageComponent src="general/avatar.png" alt="" width={100} height={100} tr={true} />
                </div>
                {/* CONTENT */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* TOP */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-md font-bold">Lama Dev</h1>
                            <span className="text-textGray">@lamaWebDev</span>
                            <span className="text-textGray">1 day ago</span>
                        </div>
                        <PostInfo />
                    </div>
                    {/* TEXT & MEDIA */}
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio eum dolorem quod possimus nesciunt aut facilis fuga libero tempora, porro reprehenderit tempore mollitia enim, perspiciatis reiciendis! Ex suscipit provident perspiciatis.</p>
                    {/* <ImageComponent src="general/post.jpeg" alt="" width={600} height={600} /> */}
                    {fileDetails && fileDetails.fileType === "image" ? (
                        <ImageComponent src={fileDetails.filePath} alt="" width={fileDetails.width} height={fileDetails.height}
                            className={fileDetails.customMetadata?.sensitive ? "blur-lg" : ""}
                        />
                    ) : (<VideoComponent src={fileDetails.filePath}
                        className={fileDetails.customMetadata?.sensitive ? "blur-lg" : ""} />
                    )}
                    <PostInteraction />
                </div>
            </div>
        </div >
    );
}

export default Post