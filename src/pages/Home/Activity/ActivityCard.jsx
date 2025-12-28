const ActivityCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col justify-between items-center rounded-lg shadow-lg p-4 bg-white text-center">
      <img className="w-full h-[180px] rounded-lg" src={image} alt={title} />
      <h2 className="text-lg my-4">{title}</h2>
      <p className="text-gray-600 text-sm text-justify mb-4">{description}</p>
    </div>
  );
};

export default ActivityCard;
