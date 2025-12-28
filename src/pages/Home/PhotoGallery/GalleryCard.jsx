export default function GalleryCard({ item }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
      <img
        src={item.image_url}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
    </div>
  );
}
