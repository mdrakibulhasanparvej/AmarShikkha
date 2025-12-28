export default function GalleryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
