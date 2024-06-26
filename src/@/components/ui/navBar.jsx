import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { restapiUserURL } from "../../../constants";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "./button";

const getAccessTokenFromCookie = () => {
  return !!Cookies.get("access_token");
};

const removeAccessTokenFromCookie = () => {
  Cookies.remove("access_token");
};

const getUserData = async (accessToken) => {
  try {
    const response = await fetch(`${restapiUserURL}/me`, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const MyNavigationMenu = () => {
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessTokenExists = getAccessTokenFromCookie();
      setHasAccessToken(accessTokenExists);

      if (accessTokenExists) {
        const accessToken = Cookies.get("access_token") || "";
        const data = await getUserData(accessToken);
        if (data) {
          setUserData(data);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    removeAccessTokenFromCookie();
    setHasAccessToken(false);
    setUserData(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center ml-auto space-x-4">
              {hasAccessToken ? (
                <div className="relative flex flex-row space-x-4">
                  <div>
                    <a href="/upload">
                      <Button className="bg-blue-600 hover:bg-blue-300 rounded-full p-2 text-white px-4">
                        <AiOutlinePlus className="h-6 w-6 text-white" />
                        Upload
                      </Button>
                    </a>
                  </div>
                  <img
                    src={
                      "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                    }
                    alt="Profile"
                    className="cursor-pointer rounded-full h-10 w-10"
                    onClick={toggleMenu}
                  />
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 py-2 bg-black-300 rounded-lg shadow-xl">
                      <button
                        onClick={handleSignOut}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <a href="/login">
                    <Button className="bg-white-600 text-black px-4 py-2 rounded">
                      Login
                    </Button>
                  </a>
                  <a href="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded">
                      Signup
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavigationMenu;
