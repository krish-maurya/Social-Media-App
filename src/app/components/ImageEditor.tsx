import Image from "next/image";


const ImageEditor = ({ onClose, preViewURL, setting, setSetting }: {
    onClose: () => void;
    preViewURL: string;
    setting: {
        type: "original" | "wide" | "square";
        sensitive: boolean;
    };
    setSetting: React.Dispatch<React.SetStateAction<{
        type: "original" | "wide" | "square";
        sensitive: boolean;
    }>>;
}) => {

    const handleChangeSensitive = () => {
        setSetting(prev => ({
            ...prev,
            sensitive: !prev.sensitive
        }))
    }
    const handleChnageType = (type: "original" | "wide" | "square") => {
        setSetting(prev => ({
            ...prev,
            type
        }))
    }
    return (
        <div className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-75 z-10 flex items-center justify-center">
            <div className="bg-black rounded-xl p-12 flex flex-col gap-4">
                {/* TOP */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <svg
                            width={32}
                            viewBox="0 0 24 24"
                            onClick={onClose}
                            className="cursor-pointer"
                        >
                            <path
                                fill="#e7e9ea"
                                d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                            />
                        </svg>

                        <h1 className="font-bold text-xl">Media Settings</h1>
                    </div>

                    <button className="py-2 px-4 rounded-full bg-white text-black font-bold" onClick={onClose}>
                        Save
                    </button>
                </div>

                {/* IMAGE CONTAINER */}
                <div className="w-[600px] h-[600px] flex items-center">
                    <Image
                        src={preViewURL}
                        alt=""
                        width={600}
                        height={600}
                        className={`w-full ${setting.type === "original"
                            ? "h-full object-contain"
                            : setting.type === "square"
                                ? "aspect-square object-cover"
                                : "aspect-video object-cover"
                            }`}
                    />
                </div>
                {/* SETTINGS */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleChnageType("original")}>
                            <svg width={24} viewBox="0 0 24 24">
                                <path
                                    className={
                                        setting.type === "original"
                                            ? "fill-iconBlue"
                                            : "fill-[#e7e9ea]"
                                    }
                                    d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z"
                                />
                            </svg>
                            Original
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleChnageType("wide")}>
                            <svg width={24} viewBox="0 0 24 24">
                                <path
                                    className={
                                        setting.type === "wide"
                                            ? "fill-iconBlue"
                                            : "fill-[#e7e9ea]"
                                    }
                                    d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z" />
                            </svg>
                            Wide
                        </div> <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleChnageType("square")}>
                            <svg width={24} viewBox="0 0 24 24">
                                <path
                                    className={
                                        setting.type === "square"
                                            ? "fill-iconBlue"
                                            : "fill-[#e7e9ea]"
                                    }
                                    d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z" />
                            </svg>
                            Square
                        </div>
                    </div>

                    <div
                        className={`cursor-pointer py-1 px-4 rounded-full text-black ${setting.sensitive ? "bg-red-500" : "bg-white"
                            }`}
                        onClick={() => handleChangeSensitive()}
                    >
                        Sensitive
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImageEditor