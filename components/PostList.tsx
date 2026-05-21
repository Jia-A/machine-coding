"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useInView } from "react-intersection-observer";
import { List } from "@/types/Post";

const PostList = ({ posts }: List) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [counter, setCounter] = useState(1)
  const [loading, setLoading] = useState(false)
  const [noMore, setNoMore] = useState(false)
  const [error, setError] = useState(false)
  console.log("Hiiii",inView)
  const [postList, setPostList] = useState(posts);
  useEffect(() => {
  if (!inView || loading || noMore) return;

  (async () => {
      setLoading(true)
      try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=20&_start=${counter*20}`);

    const data = await res.json();
    if(data.length === 0){
      setNoMore(true)
    }
    setPostList((prev) => [...prev, ...data]);
    setCounter(prev => prev+1)
      }
      catch(error){
        setError(true)
      }
      finally{
        setLoading(false)
      }
    
  })();
}, [inView, counter]);
   
  return (
    <>
      {error && (
  <div>
    An error occurred. 
    <button onClick={() => setError(false)}>Retry</button>
  </div>
)}
      {postList.map((post) => (
        <PostCard post={post} key={post.id}></PostCard>
      ))}
          <div ref={ref} />
          {loading && <div>Loading more...</div>}

          {noMore && <div>No more posts available</div>}
    </>
  );
};

export default PostList;
