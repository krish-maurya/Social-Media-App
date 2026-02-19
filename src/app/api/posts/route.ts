import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userProfileId = searchParams.get("user");
  const page = Number(searchParams.get("page") ?? 1);
  const LIMIT = 3;

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const whereCondition =
    userProfileId && userProfileId !== "undefined"
      ? {
        parentPostId: null,
        userId: userProfileId,
      }
      : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(await prisma.follow.findMany({
              where: { followerId: userId },
              select: { followingId: true },
            })).map((f) => f.followingId),
          ],
        },
      };

  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, avatar: true } },
    likes: { where: { userId }, select: { id: true } },
    rePostedBy: { where: { userId }, select: { id: true } },
    bookmarks: { where: { userId }, select: { id: true } },
    _count: { select: { likes: true, rePostedBy: true, comments: true } },
  };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      ...postIncludeQuery,
      rePost: {
        include: postIncludeQuery,
      },
    },
    take: LIMIT,
    skip: (page - 1) * LIMIT,
  });

  const totalPosts = await prisma.post.count({
    where: whereCondition,
  });

  const hasMore = page * LIMIT < totalPosts;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json({
    posts,
    hasMore,
    nextPage: hasMore ? page + 1 : null,
  });
}
