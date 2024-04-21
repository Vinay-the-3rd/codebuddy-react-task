import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Posts = () => {
  // Define state to store the fetched posts
  const [posts, setPosts] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map(({ avatar, firstName, id, image, lastName, writeup }) => {
            return (
              <div key={id} className="rounded-lg bg-white p-7 shadow-lg">
                <div className="flex items-center">
                  <img src={avatar} alt="avatar" className="h-20 w-20 rounded-full object-cover" />
                  <h2 className="pl-4 text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
                </div>
                <img src={image} alt="postImg" className="w-30  bg-cover pb-4 pt-4" />
                <p className="text-gray-700">{writeup}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
