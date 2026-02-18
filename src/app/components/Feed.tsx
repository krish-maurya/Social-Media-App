import { prisma } from "@/prisma";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import { InfiniteFeed } from "./InfiniteFeed";

export default async function Feed({
  userProfileId,
}: {
  userProfileId?: string;
}) {
  const { userId } = await auth();

  if (!userId) return;

  const whereCondition = userProfileId
    ? {
      parentPostId: null,
      userId: userProfileId,
    }
    : {
      parentPostId: null,
      userId: {
        in: [
          userId,
          ...(
            await prisma.follow.findMany({
              where: {
                followerId: userId,
              },
              select: { followingId: true },
            })
          ).map((follow) => follow.followingId),
        ],
      },
    };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      user: { select: { displayName: true, username: true, avatar: true } },
      rePost: {
        include: {
          user: {
            select: {
              displayName: true,
              username: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              likes: true,
              rePostedBy: true,
              comments: true,
            },
          },
          likes: { where: { userId: userId }, select: { id: true } },
          rePostedBy: { where: { userId: userId }, select: { id: true } },
          bookmarks: { where: { userId: userId }, select: { id: true } },
        },
      },
      likes: { where: { userId: userId }, select: { id: true } },
      rePostedBy: { where: { userId: userId }, select: { id: true } },
      bookmarks: { where: { userId: userId }, select: { id: true } },
      _count: { select: { likes: true, rePostedBy: true, comments: true } },
    },
    take: 3,
    skip: 0,
    orderBy: {
      createdAt: "desc",
    },
  });

  // FETCH POST FROM THE CURRENT USER AND THE USERS THEY FOLLOW

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <InfiniteFeed />
    </div>
  );
}
