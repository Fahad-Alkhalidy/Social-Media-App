import "../../Styling/App.css";
import { useState, useEffect } from "react";
import { IUserType } from "../../Typescript Types/userType";
import UserInfoBox from "../Functionality Component/userInfoBox";
//import Button from "../Functionality Component/Button";
import PagesDrawer from "../Functionality Component/Drawer";
import { IPost } from "../../Typescript Types/postType";
import Post from "../Functionality Component/Profile Page Components/Post";

const Home: React.FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<[{ IUserType }]>();
  const [fetchFriendPosts, setFetchFriendPosts] = useState<IPost[]>();
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
          <div className="flex-none">
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
                  <a className="justify-between" href="/profile">
                    Profile
                    <span className="badge">New</span>
                  </a>
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
            <UserInfoBox User={user} displayFollowButtonAndBio={true} />
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
              <div className="tab-content border-base-300 bg-base-100 p-10 max-h-150 overflow-y-scroll w-130">
                {fetchFriendPosts?.map((post) => (
                  <Post Post={post}></Post>
                ))}
              </div>
              <input
                type="radio"
                name="my_tabs_2"
                className="tab"
                aria-label="Explore"
                defaultChecked
              />
              <div className="tab-content border-base-300 bg-base-100 p-10 w-130">
                Tab content 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
