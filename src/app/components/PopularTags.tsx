import Image from "next/image"
import Link from "next/link"
import ImageComponent from "./ImageComponent"


const PopularTags = () => {

    return (
        <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
            <h1 className="text-xl font-bold text-textGrayLight">
                {"What's"} Happening
            </h1>

            {/* TREND EVENT */}
            <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <ImageComponent
                        src={"general/FIFA.jpeg"}
                        alt="event"
                        width={120}
                        height={120}
                        tr={true}
                    />
                </div>

                <div className="flex-1">
                    <h2 className="font-bold text-textGrayLight">
                        FIFA Club World Cup 2025 Final
                    </h2>
                    <span className="text-sm text-textGray">2 hours ago</span>
                </div>
            </div>

            {/* TOPIC 1 */}
            <div className="">
                <div className="flex items-center justify-between">
                    <span className="text-textGray text-sm">
                        Technology · Trending
                    </span>
                    <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
                </div>
                <h2 className="text-textGrayLight font-bold">Grok3</h2>
                <span className="text-textGray text-sm">85.4K posts</span>
            </div>

            {/* TOPIC 2 */}
            <div className="">
                <div className="flex items-center justify-between">
                    <span className="text-textGray text-sm">
                        Politics · Trending
                    </span>
                    <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
                </div>
                <h2 className="text-textGrayLight font-bold">G20Summit</h2>
                <span className="text-textGray text-sm">142K posts</span>
            </div>

            {/* TOPIC 3 */}
            <div className="">
                <div className="flex items-center justify-between">
                    <span className="text-textGray text-sm">
                        Science · Trending
                    </span>
                    <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
                </div>
                <h2 className="text-textGrayLight font-bold">MarsLanding</h2>
                <span className="text-textGray text-sm">57.1K posts</span>
            </div>

            <Link href='/' className="text-blue-500">Show more</Link>

        </div>
    )
}

export default PopularTags