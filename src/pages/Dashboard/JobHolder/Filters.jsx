import React from "react";
import Checkbox from "../../../components/ui/Checkbox";

const Filters = ({
  search,
  setSearch,
  trades,
  donners,
  tradeFilter,
  setTradeFilter,
  genderFilter,
  setGenderFilter,
  donnerFilter,
  setDonnerFilter,
  sortBy,
  setSortBy,
  resetFilters,
}) => {
  return (
    <aside className="w-50 shadow-sm h-full p-4 rounded space-y-5">
      <div className="flex justify-between">
        <h3 className="font-bold">Filter By</h3>
        <button
          onClick={resetFilters}
          className="text-red-500 cursor-pointer hover:text-red-600 hover:font-bold"
        >
          Reset
        </button>
      </div>

      <input
        className="input input-bordered w-full"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <h6 className="font-semibold mb-2">Trade</h6>
        {trades.map((t) => (
          <Checkbox
            key={t}
            label={t}
            value={t}
            selected={tradeFilter}
            setSelected={setTradeFilter}
          />
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Gender</h4>
        {["Male", "Female"].map((g) => (
          <Checkbox
            key={g}
            label={g}
            value={g}
            selected={genderFilter}
            setSelected={setGenderFilter}
          />
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Donner</h4>

        {donners.map((d) => (
          <Checkbox
            key={d}
            label={d}
            value={d}
            selected={donnerFilter}
            setSelected={setDonnerFilter}
          />
        ))}
      </div>

      <select
        className="select select-bordered w-full"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="az">Name A → Z</option>
        <option value="created-date">Date Last added</option>
      </select>
    </aside>
  );
};

export default Filters;
