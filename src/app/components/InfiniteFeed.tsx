"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";

const fetchPost = async (page: number, userProfileId?: string) => {
    const res = await fetch(
        `/api/posts?page=${page}&user=${userProfileId ?? ""}`
    );
    return res.json();
};

export const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
    const {
        data,
        error,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts", userProfileId],
        queryFn: ({ pageParam }) => {
            const page = pageParam ?? 1;
            return fetchPost(page, userProfileId);
        },
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
    });

    if (error) {
        console.log("Somthing wents wrong!!")
    };



    const allPosts = Array.from(
        new Map(
            (data?.pages.flatMap((page) => page.posts) ?? []).map((post) => [post.id, post])
        ).values()
    );

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
