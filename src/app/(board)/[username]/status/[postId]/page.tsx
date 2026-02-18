import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Post from '@/app/components/Post'
import Comments from '@/app/components/Comments'
import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

const statusPage = async ({ params }: { params: { username: string, postId: string } }) => {

  const postId = (await params).postId;
  const { userId } = await auth();

  if (!userId) return

  const post = await prisma.post.findFirst({
    where: {
      id: postId
    },
    include: {
      user: { select: { displayName: true, username: true, avatar: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePostedBy: { where: { userId: userId }, select: { id: true } },
      bookmarks: { where: { userId: userId }, select: { id: true } },
      _count: { select: { likes: true, rePostedBy: true, comments: true } },
      comments: {
        include: {
          user: { select: { displayName: true, username: true, avatar: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePostedBy: { where: { userId: userId }, select: { id: true } },
          bookmarks: { where: { userId: userId }, select: { id: true } },
          _count: { select: { likes: true, rePostedBy: true, comments: true } },
        }
      }
    }
  })

  if (!post) return notFound()
  return (
    <div>
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image src="/icons/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post post={post} type="status" />
      <Comments comments={post.comments} postId={post.id} username={post.user.username} />
    </div>
  )
}

export default statusPage