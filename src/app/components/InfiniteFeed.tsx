"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";

const fetchPost = async (page: number, userProfileId?: string) => {
    const res = await fetch(
        `http://localhost:3000/api/posts?page=${page}&user=${userProfileId}`
    );
    return res.json();
};

export const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
    const {
        data,
        error,
        status,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts", userProfileId],
        queryFn: ({ pageParam }) => {
            const page = pageParam ?? 1; // FIRST page
            return fetchPost(page, userProfileId);
        },
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasMore ? pages.length + 1 : undefined,
    });

    if (error) return "Something went wrong!";

    console.log(data);

    const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

    return (<InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<div>Loading...</div>}
        endMessage={
            <div className="text-center my-4">
                You have seen all posts
            </div>
        }
    >
        {allPosts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </InfiniteScroll>)
};
