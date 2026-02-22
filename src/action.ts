"use server"

import { auth, clerkClient } from "@clerk/nextjs/server";
import { UploadResponse } from "@imagekit/next";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "./prisma";
import { imagekit } from "./Utils";
import { redirect } from "next/navigation";

export const followUser = async (targetUserId: string) => {
    const { userId } = await auth()
    if (!userId) return;

    const existingFollow = await prisma.follow.findFirst({
        where: {
            followerId: userId,
            followingId: targetUserId
        }
    });
    if (existingFollow) {
        await prisma.follow.delete({
            where: { id: existingFollow.id },
        })
    } else {
        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: targetUserId
            }
        })
    }
}
export const likePost = async (postId: string) => {
    const { userId } = await auth()
    if (!userId) return;

    const existinglike = await prisma.like.findFirst({
        where: {
            userId: userId,
            postId: postId,
        }
    });
    if (existinglike) {
        await prisma.like.delete({
            where: { id: existinglike.id },
        })
    } else {
        await prisma.like.create({
            data: {
                userId,
                postId
            }
        })
    }
}
export const rePost = async (postId: string) => {
    const { userId } = await auth()
    if (!userId) return;

    const existingRePost = await prisma.post.findFirst({
        where: {
            userId: userId,
            rePostId: postId,
        }
    });
    if (existingRePost) {
        await prisma.post.delete({
            where: { id: existingRePost.id },
        })
    } else {
        await prisma.post.create({
            data: {
                userId,
                rePostId: postId
            }
        })
    }
}
export const savePost = async (postId: string) => {
    const { userId } = await auth()
    if (!userId) return;

    const existingSaved = await prisma.bookmark.findFirst({
        where: {
            userId: userId,
            postId: postId,
        }
    });
    if (existingSaved) {
        await prisma.bookmark.delete({
            where: { id: existingSaved.id },
        })
    } else {
        await prisma.bookmark.create({
            data: {
                userId,
                postId
            }
        })
    }
}

export const addComments = async (
    prevState: { success: boolean; error: boolean },
    formData: FormData
) => {
    const { userId } = await auth();

    if (!userId) return { success: false, error: true };

    const postId = formData.get("postId");
    const username = formData.get("username")
    const desc = formData.get("desc");

    const Comment = z.object({
        parentPostId: z.string(),
        desc: z.string().max(140),
    });

    const validatedFields = Comment.safeParse({
        parentPostId: postId,
        desc,
    });

    if (!validatedFields.success) {
        return { success: false, error: true };
    }

    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                userId,
            },
        });
        revalidatePath(`/${username}/status/${postId}`);
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const addPost = async (prevState: { success: boolean, error: boolean }, formData: FormData) => {
    const { userId } = await auth()
    if (!userId) return { success: false, error: true };

    const desc = formData.get("desc")
    const file = formData.get("file") as File;
    const isSensitive = formData.get("isSensitive") as string;
    const imageType = formData.get("imageType")


    const uploadFile = async (file: File): Promise<UploadResponse> => {

        const bytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(bytes);

        const transformations = `w-600${imageType === "square" ? ",ar-1-1" : imageType === "wide" ? ",ar-16-9" : ""}`;
        return new Promise((resolve, reject) => {
            imagekit.upload({
                file: fileBuffer,
                fileName: file.name,
                folder: "/posts",
                ...(file.type.includes("image") && {
                    transformation: {
                        pre: transformations,
                    }
                }),
            }, (err, result) => {
                if (err) reject(err)
                else resolve(result as UploadResponse)
            });
        })
    }

    const Post = z.object({
        desc: z.string().max(140),
        isSensitive: z.boolean().optional()
    })

    const validatedFields = Post.safeParse({
        desc: desc,
        isSensitive: JSON.parse(isSensitive)
    })

    if (!validatedFields.success) {
        return { success: false, error: true };
    }

    let img: string | undefined
    let video: string | undefined

    if (file.size) {
        const result: UploadResponse = await uploadFile(file);
        if (result.fileType === "image") {
            img = result.filePath
        } else {
            video = result.filePath
        }
    }

    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                userId,
                img,
                video,
            }
        })
        revalidatePath(`/`)
        return { success: true, error: false };

    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}

export const addUser = async (formData: FormData) => {
    const { userId } = await auth();
    if (!userId) return;

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    const primaryEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) throw new Error("Primary email not found");
    if (!user.username) throw new Error("username not found");

    const coverFile = formData.get("coverImage") as File | null;
    const avatarFile = formData.get("avatarImage") as File | null;

    const displayName = formData.get("displayName");
    const bio = formData.get("bio");
    const location = formData.get("location");
    const job = formData.get("job");
    const website = formData.get("website");
    const birthDate = formData.get("birthDate");

    const birthDateValue = birthDate ? new Date(birthDate as string) : undefined;

    if (birthDateValue && isNaN(birthDateValue.getTime())) {
        throw new Error("Invalid birthDate format. Must be YYYY-MM-DD");
    }

    const UserSchema = z.object({
        displayName: z.string().min(2),
        bio: z.string().max(160).optional(),
        location: z.string().optional(),
        job: z.string().optional(),
        website: z.string().optional(),
        birthDate: z.string().optional(),
    });

    const validated = UserSchema.safeParse({
        displayName,
        bio,
        location,
        job,
        website,
    });

    if (!validated.success) {
        console.log(validated.error);
        return;
    }

    const uploadFile = async (file: File): Promise<string> => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueFileName = `${Date.now()}-${Math.floor(
            Math.random() * 10000
        )}-${file.name}`;

        return new Promise((resolve, reject) => {
            imagekit.upload(
                {
                    file: buffer,
                    fileName: uniqueFileName,
                    folder: "/general",
                },
                (err, result) => {
                    if (err || !result) reject(err);
                    else resolve(result.url);
                }
            );
        });
    };

    let coverUrl: string | null = null;
    let avatarUrl: string | null = null;

    try {
        if (coverFile && coverFile.size > 0) {
            coverUrl = await uploadFile(coverFile);
        }

        if (avatarFile && avatarFile.size > 0) {
            avatarUrl = await uploadFile(avatarFile);
        }

        await prisma.user.upsert({
            where: { id: userId },
            update: {
                ...validated.data,
                ...(birthDateValue && { birthDate: birthDateValue }),
                ...(coverUrl && { coverImage: coverUrl }),
                ...(avatarUrl && { avatar: avatarUrl }),
            },
            create: {
                id: userId,
                email: primaryEmail,
                username: user.username,
                ...validated.data,
                ...(birthDateValue && { birthDate: birthDateValue }),
                coverImage: coverUrl,
                avatar: avatarUrl,
            },
        });
    } catch (error) {
        console.log("User Update Error:", error);
        return; 
    }

    redirect("/");
};