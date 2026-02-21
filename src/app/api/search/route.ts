import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ users: [], posts: [] });
  }

  const [users, posts] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { displayName: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      select: { id: true, displayName: true, username: true, avatar:true },
    }),
    prisma.post.findMany({
      where: {
        desc: { contains: query, mode: "insensitive" },
      },
      take: 5,
      select: {
        id: true,
        desc: true,
        userId: true,
        user: {
          select: {
            username: true,      
          },
        },
      },
    }),
  ]);

  return NextResponse.json({ users, posts });
}