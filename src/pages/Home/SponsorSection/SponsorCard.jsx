export default function SponsorCard({ sponsor }) {
  // console.log(sponsor);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-white hover:shadow-xl transition">
      <img
        src={sponsor.imageUrl}
        alt={sponsor.name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold text-center text-black">
        {sponsor.name}
      </h3>
      <p className="text-sm mt-2 text-center text-black">{sponsor.quote}</p>
    </div>
  );
}
