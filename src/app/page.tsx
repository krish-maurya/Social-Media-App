import ImageComponent from "./components/ImageComponent"

const Homepage = () => {
  return (
    <div className=''>
      <div className="relavtive w-[100px] h-[100px]">
      <ImageComponent src="general/post.jpeg" alt="Post Image" width={600} height={600} className="w-full h-auto rounded-lg" />
      </div>
    </div>
  )
}

export default Homepage