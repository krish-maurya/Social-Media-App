"use client";

import { addUser } from "@/action";
import { Camera, ImageIcon, Pencil, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const OnboardingPage = () => {
    const [bio, setBio] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [job, setJob] = useState("");
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    const coverInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: (val: string) => void,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setter(url);
        }
    };

    return (
        <form action={addUser} className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                        Set up your profile
                    </h2>
                    <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
                        Step 1 of 1
                    </span>
                </div>

                {/* Cover Section */}
                <div
                    className="relative w-full h-52 lg:h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 cursor-pointer group"
                    onClick={() => coverInputRef.current?.click()}
                >
                    {coverImage && (
                        <img
                            src={coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                        <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-700">
                            {coverImage ? (
                                <Pencil className="w-4 h-4 text-white" />
                            ) : (
                                <ImageIcon className="w-4 h-4 text-white" />
                            )}
                            <span className="text-sm text-white">
                                {coverImage ? "Edit cover" : "Add cover photo"}
                            </span>
                        </div>
                    </div>

                    <input
                        ref={coverInputRef}
                        type="file"
                        name="coverImage"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, setCoverImage)}
                    />

                    {/* Avatar */}
                    <div className="absolute left-6 -bottom-12">
                        <div
                            className="relative w-24 h-24 cursor-pointer group"
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            <div className="w-full h-full rounded-full border-4 border-zinc-900 overflow-hidden bg-zinc-800 shadow-lg">
                                {avatarImage ? (
                                    <img
                                        src={avatarImage}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-zinc-500" />
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                                <Camera className="w-3 h-3 text-black" />
                            </div>
                        </div>

                        <input
                            ref={avatarInputRef}
                            type="file"
                            name="avatarImage"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, setAvatarImage)}
                        />
                    </div>
                </div>

                {/* Form Section */}
                <div className="px-6 pt-16 pb-8 flex flex-col gap-5">
                    <p className="text-xs text-zinc-400">
                        This information can be changed anytime.
                    </p>

                    {/* Display Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                            <User className="w-3 h-3" />
                            Display name
                        </label>
                        <input
                            value={displayName}
                            name="displayName"
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                            className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        />
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-[10px] text-zinc-400 uppercase">
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            name="bio"
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            maxLength={160}
                            placeholder="Tell the world about yourself"
                            className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        />
                        <span className="absolute bottom-1 right-2 text-[10px] text-zinc-500">
                            {bio.length}/160
                        </span>
                    </div>

                    {/* Grid Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            value={location}
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                            className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        />
                        <input
                            value={job}
                            name="job"
                            onChange={(e) => setJob(e.target.value)}
                            placeholder="Occupation"
                            className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        />
                    </div>

                    <input
                        value={website}
                        name="website"
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website"
                        className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                    />

                    <input
                        type="date"
                        value={birthDate}
                        name="birthDate"
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                    />

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => router.push("/")} className="flex-1 py-2 rounded-lg border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 transition">
                            Skip
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:opacity-90 transition"
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OnboardingPage;