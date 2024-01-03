import { IoSearchSharp } from "react-icons/io5";
import PostsClient from "./(posts)/PostsClient"
import getAllPosts from "./actions/getAllPosts";
import getCurrentUser from "./actions/getCurrentUser"
import getPosts from "./actions/getPosts";

export default async function Home() {
  const currentUser = await getCurrentUser();
  let posts: any;

  if(!currentUser){
    posts = await getAllPosts();
  }else{
    posts = await getPosts();
  }

  return (
     posts?.length > 0 ? 
      (<PostsClient currentUser={currentUser} posts={posts}/>) : 
      (<div className="w-full h-screen flex justify-center items-center">
        <h2 className="text-2xl sm:text-4xl flex items-center justify-center">Follow more people to see posts <span className="ml-2"><IoSearchSharp size={30}/></span></h2>
      </div>)
  )
}
