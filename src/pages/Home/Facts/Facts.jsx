import {
  FaUsers,
  FaHandshake,
  FaProjectDiagram,
  FaLayerGroup,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaUsers size={46} />,
    value: "1000K",
    label: "Donors",
  },
  {
    id: 2,
    icon: <FaHandshake size={46} />,
    value: "7800+",
    label: "Sponsors",
  },
  {
    id: 3,
    icon: <FaProjectDiagram size={46} />,
    value: "399",
    label: "Projects",
  },
  {
    id: 4,
    icon: <FaLayerGroup size={46} />,
    value: "9995",
    label: "Programs",
  },
];

const Facts = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0b1f17] via-[#0f3d2e] to-[#134e4a] text-white">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-widest">— FACTS —</h2>
      </div>

      {/* Stats grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white/10 backdrop-blur-md p-8 text-center shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center mb-6 text-[#57C785] group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>

            <h3 className="text-4xl font-extrabold mb-2">{item.value}</h3>

            <p className="text-lg tracking-wide text-gray-200">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facts;
