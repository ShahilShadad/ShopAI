import TopPostCard from "../socialComponents/TopPostCard";
type BestPost = {
  id: string
  title: string
  image: string
  likes: number
  comments: number
  shares: number
  impressions: number
  engagement: number
}

type Props = {
  bestPosts: BestPost[]
}
const SocialTopPostsCard = ({ bestPosts  }: Props)=> {
    const randomPosts = [...bestPosts]
    .sort(() => Math.random() - 0.5)
    .slice(0,3)

    return(
        <div className="text-black bg-white flex flex-col shadow-md rounded-xl text-black w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] gap-5 p-5">
            <div className="flex justify-between">
                <h1 className="font-bold text-[15px] lg:text-[22px]">Mejores publicaciones</h1>
            </div>
           {randomPosts.map((post, index) => (
        <TopPostCard
            key={index}
            top={index + 1}
            img={post.image}
            alt={post.title}
            title={post.title}
            platform="Instagram"
            date="Mayo 2026"
            likes={post.likes}
            comms={post.comments}
            impressions={post.impressions}
        />
      ))}
        </div>
    )
}

export default SocialTopPostsCard