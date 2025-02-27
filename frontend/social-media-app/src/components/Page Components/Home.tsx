import "../../Styling/App.css";
import { useState, useEffect } from "react";
import { IUserType } from "../../Typescript Types/userType";
import UserInfoBox from "../Functionality Component/userInfoBox";
import Button from "../Functionality Component/Button";
const Home: React.FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<[{ IUserType }]>();
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

              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer"
                    className="btn btn-primary drawer-button"
                  >
                    Show Followed Pages
                  </label>
                </div>
                <div className="drawer-side z-1">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                      <a>Sidebar Item 1</a>
                    </li>
                    <li>
                      <a>Sidebar Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
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
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Updates
                  <span className="badge badge-xs badge-warning">NEW</span>
                </a>
              </li>
              <li>
                <a>
                  Stats
                  <span className="badge badge-xs badge-info"></span>
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
        <div className="card bg-base-300 rounded-box flex flex-col flex-start overflow-y-scroll max-h-screen align-top">
          {fetchedUsers?.map((user: IUserType) => (
            <UserInfoBox User={user} />
          ))}
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
          content
        </div>
      </div>
    </div>
  );
};

export default Home;
