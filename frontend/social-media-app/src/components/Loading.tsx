interface LoadingProps {
  loading: boolean;
}
const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {loading ? "Signing Up..." : "Sign Up"}
    </button>
  );
};

export default Loading;
