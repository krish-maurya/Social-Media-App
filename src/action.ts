"use server"

import { auth } from "@clerk/nextjs/server";
import { UploadResponse } from "@imagekit/next";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "./prisma";
import { imagekit } from "./Utils";

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