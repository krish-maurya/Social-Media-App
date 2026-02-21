import Feed from "../components/Feed"
import Share from "../components/Share"
import Link from "next/link"

const Homepage = () => {
  return (
    <div className="flex flex-col">
      {/* TABS */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-4 flex justify-between border-b border-borderGray">
        <Link
          href="/"
          className="flex-1 flex justify-center pb-3 pt-4 font-bold text-white border-b-4 border-iconBlue hover:bg-[#181818] transition"
        >
          For you
        </Link>
        <Link
          href="/"
          className="flex-1 flex justify-center pb-3 pt-4 font-bold text-textGray hover:bg-[#181818] transition"
        >
          Following
        </Link>
      </div>

      {/* SHARE */}
      <div className="border-b border-borderGray">
        <Share />
      </div>

      {/* FEED */}
      <div className="flex flex-col">
        <Feed />
      </div>
    </div>
  )
}

export default Homepage