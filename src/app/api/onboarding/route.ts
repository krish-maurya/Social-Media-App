import { prisma } from "@/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";


export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  // Get user data from Clerk to fill required fields
  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);

  await prisma.user.upsert({
    where: { id: userId },
    update: {
      displayName: body.displayName,
      bio: body.bio,
      location: body.location,
      website: body.website,
      job: body.job,
      birthDate: body.birthDate ? new Date(body.birthDate) : null,
    },
    create: {
      id: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: clerkUser.username ?? userId,
      displayName: body.displayName,
      bio: body.bio,
      location: body.location,
      website: body.website,
      job: body.job,
      birthDate: body.birthDate ? new Date(body.birthDate) : null,
    },
  });

  return Response.json({ success: true });
}