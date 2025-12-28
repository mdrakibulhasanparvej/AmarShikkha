import React from "react";

// Truncate helper function
const truncateText = (text, maxLength = 120) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const NewsGalleryCard = ({ title, date, description, image_url }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Image */}
      <img src={image_url} alt={title} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {title}
        </h3>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-3">{date}</p>

        {/* Truncated Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {truncateText(description, 140)}
        </p>

        {/* Button */}
        <button className="mt-auto bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition">
          READ MORE
        </button>
      </div>
    </article>
  );
};

export default NewsGalleryCard;
