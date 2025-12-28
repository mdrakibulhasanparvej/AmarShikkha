import SponsorCard from "./SponsorCard";
import { sponsors } from "./sponsorData";

export default function SponsorSection() {
  // console.log(sponsors.length);
  return (
    <section className="bg-white dark:bg-gray-900 py-10 px-20 text-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Sponsor Feedback
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition">
          View All
        </button>
      </div>
    </section>
  );
}
