import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { restapiImageURL } from "../../../constants";
import Cookies from "js-cookie";
import { Button } from "./button";

const UploadForm = () => {
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [tagList, setTagList] = useState([]);

  const handleTagsChange = (e) => {
    const inputTags = e.target.value;
    setTags(inputTags);
    const tagsArray = inputTags.split(/[\s,]+/).filter((tag) => tag !== "");
    setTagList(tagsArray);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tags", JSON.stringify(tagList));
    formData.append("image", image);
    const accessToken = Cookies.get("access_token");

    try {
      const res = await fetch(`${restapiImageURL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Token ${accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse("Uploaded successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponse("Upload failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen -my-32 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter tags (space or comma separated)"
              value={tags}
              onChange={handleTagsChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            {tagList.length > 0 && (
              <div className="flex flex-wrap justify-center mt-2">
                {tagList.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-full flex flex-row justify-center">
            <Button
              type="submit"
              className="rounded-full p-2 bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <AiOutlinePlus className="h-6 w-6" />
              Upload
            </Button>
          </div>
        </form>

        {response && (
          <div className="mt-4 text-center text-green-500">
            {typeof response === "string" ? response : JSON.stringify(response)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
