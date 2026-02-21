"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageComponent from "@/app/components/ImageComponent";
import { useCurrentUser } from "@/providers/UserContextProvider";
import { useUser } from "@clerk/nextjs";

export default function InterceptedComposePost() {
  const router = useRouter();
  const userData = useCurrentUser();
  const {user}= useUser()

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className='cursor-pointer' onClick={closeModal}>X</div>
          <div className='text-iconBlue font-bold'>Drafts</div>
        </div>

        {/* CENTER */}
        <div className="py-8 flex gap-4">
          <div className='relative w-10 h-10 rounded-full overflow-hidden'>
            <ImageComponent
              src={userData?.avatar || user?.imageUrl || "general/avatar.png"}
              alt="Lama Dev"
              width={100}
              height={100}
              tr={true}
            />
          </div>
          <input
            className="flex-1 bg-transparent outline-none text-lg"
            type="text"
            placeholder="What is happening?!"
          />
        </div>

        {/* BOTTOM */}
        <div className="">
          <div className=""></div>
          <div className="flex items-center justify-between gap-4 flex-wrap border-t border-borderGray py-3">
            <div className="flex gap-4 flex-wrap">
              <label htmlFor="file-upload">
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
            <button className="bg-white text-black font-bold rounded-full px-5 py-1.5">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}