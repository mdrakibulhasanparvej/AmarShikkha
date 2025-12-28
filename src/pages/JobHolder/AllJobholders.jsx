import React, { useEffect, useState, useRef } from "react";
import useAxios from "../../hook/useAxios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useSearchParams } from "react-router";

import Filters from "./Filters";
import JobholdersTable from "./JobholdersTable";
import ViewModal from "./ViewModal";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router";
import Swal from "sweetalert2";

const AllJobholders = () => {
  const axiosSecure = useAxios();
  const tableRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  // ================= STATES =================
  const [jobholders, setJobholders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [donnerFilter, setDonnerFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const [selected, setSelected] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const trades = [
    "Electrical House Wiring",
    "Industrial Electrical Wiring",
    "Industrial Sewing",
    "Dressmaking & Tailoring",
    "Garments Machine Mechanics",
    "Computer",
    "Com. Freelancing & sopken Eng.",
    "Motorbike Mechanics",
    "Spoken English",
  ];
  const donners = ["GSRD", "PLANET"];

  // ================= FETCH =================
  useEffect(() => {
    axiosSecure.get("/all-job-holders").then((res) => {
      setJobholders(res.data.data || []);
    });
  }, [axiosSecure]);

  // ================= URL → STATE =================
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setTradeFilter(searchParams.getAll("trade"));
    setGenderFilter(searchParams.getAll("gender"));
    setDonnerFilter(searchParams.getAll("donner"));
    setSortBy(searchParams.get("sort") || "");
  }, []);

  // ================= STATE → URL =================
  useEffect(() => {
    const params = {};

    if (search) params.search = search;
    if (tradeFilter.length) params.trade = tradeFilter;
    if (genderFilter.length) params.gender = genderFilter;
    if (donnerFilter.length) params.donner = donnerFilter;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
  }, [search, tradeFilter, genderFilter, donnerFilter, sortBy]);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let data = [...jobholders];

    if (tradeFilter.length)
      data = data.filter((j) => tradeFilter.includes(j.trade));

    if (genderFilter.length)
      data = data.filter((j) => genderFilter.includes(j.gender));

    if (donnerFilter.length)
      data = data.filter((j) => donnerFilter.includes(j.donner));

    if (search)
      data = data.filter((j) =>
        j.name.toLowerCase().includes(search.toLowerCase())
      );

    // Sort A → Z
    if (sortBy === "az") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort by Created Date (latest first)
    if (sortBy === "created-date") {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFiltered(data);
    setPage(1);
  }, [jobholders, tradeFilter, genderFilter, donnerFilter, search, sortBy]);

  // ================= PAGINATION =================
  const start = (page - 1) * rowsPerPage;
  const visibleRows = filtered.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // ================= RESET =================
  const resetFilters = () => {
    setSearch("");
    setTradeFilter([]);
    setGenderFilter([]);
    setDonnerFilter([]);
    setSortBy("");
    setSearchParams({});
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job holder will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-job-holder/${id}`);
        if (res.data.data.deletedCount > 0) {
          setJobholders((prev) => prev.filter((j) => j._id !== id));
          Swal.fire("Deleted!", "", "success");
        }
      }
    });
  };

  // ================= EXCEL =================
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(visibleRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Jobholders");
    saveAs(
      new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })]),
      "jobholders.xlsx"
    );
  };

  return (
    <div className="p-6 flex gap-6 ">
      <div className="">
        {/* SIDEBAR */}
        <Filters
          search={search}
          setSearch={setSearch}
          trades={trades}
          donners={donners}
          tradeFilter={tradeFilter}
          setTradeFilter={setTradeFilter}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          donnerFilter={donnerFilter}
          setDonnerFilter={setDonnerFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            All Jobholders ({filtered.length})
          </h2>
          <div className="flex gap-2">
            <Link className="btn btn-accent" to="/dashboard/downloadPDF">
              Print
            </Link>
            <button className="btn btn-success" onClick={exportExcel}>
              Export Excel
            </button>
          </div>
        </div>

        <JobholdersTable
          tableRef={tableRef}
          visibleRows={visibleRows}
          start={start}
          handleDelete={handleDelete}
          setSelected={setSelected}
          setOpenView={setOpenView}
          setOpenUpdate={setOpenUpdate}
        />

        {/* PAGINATION */}
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 && "btn-active"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {openView && <ViewModal selected={selected} setOpenView={setOpenView} />}

      {openUpdate && (
        <UpdateModal
          selected={selected}
          setOpenUpdate={setOpenUpdate}
          jobholders={jobholders}
          setJobholders={setJobholders}
          axiosSecure={axiosSecure}
        />
      )}
    </div>
  );
};

export default AllJobholders;
