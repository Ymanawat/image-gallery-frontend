import React, { useState, useEffect } from "react";
import { Skeleton } from "../../components/ui/skeleton";

const CardComponent = ({ unique_id, image_url, tags }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = image_url;
    img.onload = () => setLoading(false);
  }, [image_url]);

  return (
    <div className="max-w-sm h-200 min-h-200 rounded overflow-hidden shadow-lg border border-gray-600 m-4">
      {loading ? (
        <div className="flex flex-col space-y-3 p-4">
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-400" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-400" />
            <Skeleton className="h-4 w-[200px] bg-gray-400" />
          </div>
        </div>
      ) : (
        <div className="relative bg-white" style={{ paddingBottom: "100%" }}>
          <img
            src={image_url}
            alt="Course"
            className="absolute inset-0 max-w-300 w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="px-6 pt-4 pb-2">
        <div className="flex flex-wrap">
          {tags?.map((tagItem, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tagItem}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
