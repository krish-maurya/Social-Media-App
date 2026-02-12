"use server"

import { imagekit } from "./Utils";


export const shareAction = async (formData: FormData, setting: { type: "original" | "wide" | "square", sensitive: boolean }) => {
    const file = formData.get("file") as File;
    // const desc = formData.get("desc") as string;

    const bytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);

    const transformations = `w-600${setting.type === "square" ? ",ar-1-1" : setting.type === "wide" ? ",ar-16-9" : ""}`;

    imagekit.upload({
        file: fileBuffer,
        fileName: file.name,
        folder: "/posts",
        ...(file.type.includes("image") && {
            transformation: {
                pre: transformations,
            }
        }),
        customMetadata: {
            sensitive: setting.sensitive,
        }
    }, (err, result) => {
        if (err) {
            console.error("Error uploading file:", err);
        } else {
            console.log("File uploaded successfully:", result);
        }
    });

}