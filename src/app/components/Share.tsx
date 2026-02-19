"use client";
import { addPost } from "@/action";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import ImageComponent from "./ImageComponent";
import ImageEditor from "./ImageEditor";

const Share = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [setting, setSetting] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
    }
  }


  const preViewURL = media ? URL.createObjectURL(media) : null;

  const { user } = useUser();

  const [state, formAction, isPending] = useActionState(addPost, { success: false, error: false })
  const handleSubmit = async (formData: FormData) => {
    if (media) {
      formData.set("file", media); // ensure the actual File object is attached
    }
    formData.set("imageType", setting.type);
    formData.set("isSensitive", String(setting.sensitive));
    return formAction(formData);
  }

  const formRef = useRef<HTMLFormElement|null>(null)

  useEffect(() => {
    if (state.success) {
      setMedia(null);
      setSetting({ type: "original", sensitive: false });
      formRef.current?.reset(); 
    }
  }, [state.success]);
  return (
    <form className="p-4 flex gap-4"
    ref={formRef}
      // action={formData => shareAction(formData, setting)}
      action={handleSubmit}
    >
      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <ImageComponent
          src={user?.imageUrl || "general/avatar.png"}
          alt=""
          width={100}
          height={100}
          tr={true}
        />
      </div>
      {/* OTHERS */}
      <div className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="bg-transparent outline-none placeholder:text-textGray text-xl"
        />
        {media?.type.includes("image") && preViewURL && (
          <div className="relative rounded-xl overflow-hidden">
            <Image src={preViewURL} width={600} height={600} alt="" className={`w-full ${setting.type === "original"
              ? "h-full object-contain"
              : setting.type === "square"
                ? "aspect-square object-cover"
                : "aspect-video object-cover"
              }`} />
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer" onClick={() => setIsEditorOpen(true)}>Edit</div>
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm" onClick={() => setMedia(null)}>X</div>
          </div>
        )}
        {
          media?.type.includes("video") && preViewURL && (
            <div className="relative">
              <video src={preViewURL} controls />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm" onClick={() => setMedia(null)}>X</div>
            </div>
          )
        }
        {isEditorOpen && preViewURL &&
          (<ImageEditor onClose={() => setIsEditorOpen(false)}
            preViewURL={preViewURL}
            setting={setting}
            setSetting={setSetting}
          />)}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              name="file"
              onChange={handleUpload}
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <Image
                src="/icons/image.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
            <Image
              src="/icons/gif.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/icons/poll.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/icons/emoji.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/icons/schedule.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/icons/location.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button disabled={isPending} className="bg-white text-black font-bold rounded-full py-2 px-4 disabled:cursor-not-allowed disabled:bg-slate-200">
            {isPending ? "Posting" : "Post"}
          </button>
          {state.error && (<span className="text-red-300 p-4">Somthing Went Wrong!</span>)}
        </div>
      </div>
    </form>
  );

}

export default Share