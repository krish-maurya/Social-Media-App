"use client";

import { useCurrentUser } from "@/providers/UserContextProvider";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "./ImageComponent";
import { Notification } from "./Notification";
import Socket from "./Socket";


const LeftBar = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const userData = useCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  const menuList = [
    { id: 1, name: "Home", link: "/", icon: "home.svg" },
    { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
    { id: 4, name: "Messages", link: "/", icon: "message.svg" },
    { id: 5, name: "Bookmarks", link: "/", icon: "bookmark.svg" },
    { id: 6, name: "Jobs", link: "/", icon: "job.svg" },
    { id: 7, name: "Community", link: "/", icon: "community.svg" },
    { id: 9, name: "Profile", link: `/${user?.username}`, icon: "profile.svg" },
    { id: 10, name: "More", link: "/", icon: "more.svg" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link href="/" className="p-2 rounded-full hover:bg-[#181818]">
          <Image src="/icons/icon.svg" alt="logo" width={48} height={48} />
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item, i) => (
            <div key={item.id || i}>
              {i === 2 && (
                <div>
                  <Notification />
                </div>
              )}
              <Link
                href={item.link}
                className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              >
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <span className="hidden xxl:inline">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
        {/* BUTTON */}
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
        >
          <Image src="/icons/post.svg" alt="new post" width={24} height={24} />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      <Socket />

      {/* USER */}
      <div className="relative" ref={menuRef}>
        {/* FLOATING MENU */}
        {menuOpen && (
          <div className="absolute bottom-16 left-0 w-64 bg-black border border-[#2f3336] rounded-2xl shadow-lg overflow-hidden z-50">
            {/* Profile */}
            <Link
              href={`/${user?.username}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#181818] transition"
            >
              <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
                <ImageComponent
                  src={userData?.avatar || user?.imageUrl || "general/avatar.png"}
                  alt="avatar"
                  width={40}
                  height={40}
                  tr={true}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">{userData?.displayName}</span>
                <span className="text-sm text-textGray">@{user?.username}</span>
              </div>
            </Link>

            <div className="border-t border-[#2f3336]" />

            {/* Menu Items */}
            <Link
              href={`/${user?.username}`}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 hover:bg-[#181818] transition text-white font-semibold"
            >
              View Profile
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 hover:bg-[#181818] transition text-white font-semibold"
            >
              Settings
            </Link>

            <div className="border-t border-[#2f3336]" />

            {/* Sign Out */}
            <button
              onClick={() => signOut({ redirectUrl: "/sign-in" })}
              className="w-full text-left px-4 py-3 hover:bg-[#181818] transition text-white font-semibold"
            >
              Sign out @{user?.username}
            </button>
          </div>
        )}

        {/* USER ROW */}
        <div
          className="flex items-center justify-center xxl:justify-between cursor-pointer hover:bg-[#181818] rounded-xl p-2 xxl:p-4 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* AVATAR - always visible */}
          <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
            <ImageComponent
              src={userData?.avatar || user?.imageUrl || "general/avatar.png"}
              alt="avatar"
              width={40}
              height={40}
              tr={true}
            />
          </div>

          {/* NAME + USERNAME - only on xxl */}
          <div className="hidden xxl:flex flex-col flex-1 ml-2 overflow-hidden">
            <span className="font-bold truncate">{userData?.displayName}</span>
            <span className="text-sm text-textGray truncate">@{user?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;