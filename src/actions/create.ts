"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
    // console.log("create-action", data);
    const blogInfo = Object.fromEntries(data.entries());  //its converts as plain object
    const modifiedData = {
        ...blogInfo,
        tags: blogInfo.tags
            .toString()
            .split(",")
            .map((tag) => tag.trim()),
        authorId: 4,
        isFeatured: Boolean(blogInfo.isFeatured),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData),
    });

    console.log("result", res);

    const result = await res.json();

    if (result?.id) {
        revalidateTag("BLOGS");
        revalidatePath("/blogs");
        redirect("/");
    }
    return result;
};