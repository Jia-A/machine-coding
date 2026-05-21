import PostList from "@/components/PostList"


const page = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')
    const data = await response.json()
  return (
    <PostList posts={data}></PostList>
  )
}

export default page