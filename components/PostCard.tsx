import { Post } from '@/types/Post'
import React from 'react'

const PostCard = ({post} : {post : Post}) => {
  return (
    <article className='p-2 border border-b-gray-900 flex flex-col bg-amber-50 text-amber-950'>
        <h2 className='text-2xl'>{post.title}</h2>
        <p>{post.body}</p>
    </article>
  )
}

export default PostCard