import useGetPosts from "../../../hooks/useGetPosts";
import Button from "../Button";
import Loading from "../Loading";
import Post from "../Post";
const UserPosts = () => {
  const { loading, error, allUserPosts } = useGetPosts();
  return (
    <div className="card bg-base-300 rounded-box flex flex-col justify-start items-center max-h-screen overflow-y-scroll basis-1/3">
      <div className="flex items-center justify-between mt-5 mb-5">
        <h3 className="text-xl font-semibold">Posts</h3>
         <Button>Create A New Post</Button> 
      </div>
      {allUserPosts?.map((post) => (
        <Post Post={post} />
      ))}
      <p className="text-center">{loading ? <Loading></Loading> : ""}</p>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};
export default UserPosts;
