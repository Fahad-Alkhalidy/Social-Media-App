import "../../Styling/App.css";
import { useState, useEffect, use } from "react";
import { IUser, IUserType } from "../../Typescript Types/userType";
import UserInfoBox from "../Functionality Component/userInfoBox";
//import Button from "../Functionality Component/Button";
import PagesDrawer from "../Functionality Component/Drawer";
import { IPost } from "../../Typescript Types/postType";
import Post from "../Functionality Component/Profile Page Components/Post";
import { typographyClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<[{ IUserType }]>();
  const [fetchFriendPosts, setFetchFriendPosts] = useState<IPost[]>();
  const [fetchExplorePosts, setFetchExplorePosts] = useState<IPost[]>();
  const navigate = useNavigate();
  const openUserProfile = () => {
    navigate(`/profile/${localStorage.getItem("id")}`);
  };
  useEffect(() => {
    const fetchFriendPosts = async () => {
      try {
        const response = await fetch("/api/v1/posts/FriendsPosts");
        const result = await response.json();
        if (response.ok) setFetchFriendPosts(result.data.friendPosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriendPosts();
  }, []);
  // console.log(fetchFriendPosts);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/v1/users/`);
        const result = await response.json();
        if (response.ok) setFetchedUsers(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/v1/posts/");
        const result = await response.json();
        if (response.ok) {
          setFetchExplorePosts(result.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="main">
      <div className="nav-bar">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <div className="flex">
              <div className="logo-image w-20 h-auto"></div>
              <a className="btn btn-ghost text-xl mr-10">talkybox</a>
              <PagesDrawer></PagesDrawer>
            </div>
          </div>
          <div className="flex-1 basis-1/10 flex">
            <label className="input flex-1">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search Users" />
            </label>
          </div>
          <div className=" basis-1/4 flex justify-end">
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
              <li>
                <a href="/chat">
                  Chat
                  <span className="badge badge-xs">99+</span>
                </a>
              </li>
            </ul>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button className="justify-between" onClick={openUserProfile}>
                    Profile
                    <span className="badge">New</span>
                  </button>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row h-dvh">
        <div className="card bg-base-300 rounded-box flex flex-col flex-start overflow-y-scroll min-h-screen align-top">
          {fetchedUsers?.map((user) => (
            <UserInfoBox User={user} />
          ))}
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box flex justify-between grow place-items-center min-h-screen">
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-border min-h-screen">
            <div className="flex flex-col justify-center align-middle">
              <input
                type="radio"
                name="my_tabs_2"
                className="tab"
                aria-label="Friends' Posts"
              />
              <div className="tab-content border-base-300 bg-base-300 max-h-150 overflow-y-scroll">
                <div className="flex flex-col gap-5 mb-5 mt-5">
                  <div className="items-to-center">
                    {fetchFriendPosts?.map((post) => (
                      <Post Post={post} key={post.postId}></Post>
                    ))}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="my_tabs_2"
                className="tab"
                aria-label="Explore"
                defaultChecked
              />
              <div className="tab-content border-base-300 bg-base-300 max-h-150 overflow-y-scroll">
                <div className="flex flex-col gap-5 mb-5 mt-5">
                  <div className="items-to-center">
                    {fetchExplorePosts?.map((post) => (
                      <Post Post={post} key={post.postId}></Post>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
