import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import ImageComponent from "./ImageComponent";

const Recommendations = async () => {

  const { userId } = await auth();


  if (!userId) return;

  const followingIds = await prisma.follow.findMany({
    where: {
      followerId: userId
    },
    select: { followingId: true }
  })

  const followedUserIDs = followingIds.map(f => f.followingId)


  const friendsRecommendations = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followedUserIDs },
      followers: { some: { followerId: { in: followedUserIDs } } },
    },
    take: 3,
    select: { id: true, displayName: true, username: true, avatar: true },
  })

  
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      {friendsRecommendations.map((person) => (
        <div
          key={person.id}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="relative rounded-full overflow-hidden w-10 h-10">
              <ImageComponent
                src={person.avatar ||"general/avatar.png"}
                alt={person.username}
                width={100}
                height={100}
                tr={true}
              />
            </div>

            <div>
              <h1 className="text-md font-bold">
                {person.displayName || person.username}
              </h1>
              <span className="text-textGray text-sm">
                @{person.username}
              </span>
            </div>
          </div>

          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}

      <Link href="/explore" className="text-iconBlue">
        Show More
      </Link>

    </div >
  );
};

export default Recommendations;
