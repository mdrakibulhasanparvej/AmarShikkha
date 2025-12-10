import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver"; // ← THIS LINE ADDED
import useAxios from "../../hook/useAxios";
import Filters from "./Filters";

// ====================== STYLES ======================
const styles = StyleSheet.create({
  page: {
    paddingTop: "0.8in",
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "0.9in",
    justifyContent: "center",
  },
  card: {
    width: "3in",
    height: "4.52in",
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: "0.10in",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  image: {
    width: "2.15in",
    height: "2.87in",
    borderRadius: 6,
    marginBottom: "0.05in",
    objectFit: "cover",
  },
  textBox: {
    width: "100%",
    height: "1.55in",
    paddingHorizontal: "0.02in",
    marginTop: "0.05in",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 2,
  },
  row: { flexDirection: "row", alignItems: "flex-start", lineHeight: 2 },
  label: { fontSize: 10, fontWeight: "normal", width: "0.85in" },
  value: { fontSize: 10, maxWidth: "1.90in", lineHeight: 1.2 },
  pageNumber: {
    position: "absolute",
    bottom: "5%",
    right: "50%",
    fontSize: 12,
    color: "#444",
  },
});

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size)
    chunks.push(arr.slice(i, i + size));
  return chunks;
};

/* ====================== PDF ====================== */
const JobholdersPDF = ({ data }) => {
  const pages = chunkArray(data, 8);

  return (
    <Document>
      {pages.map((pageItems, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {pageItems.map((holder) => (
            <View key={holder._id} style={styles.card}>
              {holder.photo_URL ? (
                <Image src={holder.photo_URL} style={styles.image} />
              ) : (
                <View style={[styles.image, { backgroundColor: "#eee" }]} />
              )}
              <View style={styles.textBox}>
                <View style={styles.row}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.value}>: {holder.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Trade</Text>
                  <Text style={[styles.value, { fontSize: 9 }]}>
                    : {holder.trade}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Designation</Text>
                  <Text style={styles.value}>: {holder.designation}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Workplace:</Text>
                  <Text style={styles.value}>: {holder.workplace}</Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>: {holder.address}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Salary</Text>
                  <Text style={styles.value}>
                    : {holder.salary} Tk-(Monthly)
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <Text style={styles.pageNumber}>{pageIndex + 1}</Text>
        </Page>
      ))}
    </Document>
  );
};

/* ====================== MAIN ====================== */
const DownloadPDF = () => {
  const axiosSecure = useAxios();

  const [jobHolders, setJobHolders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [donnerFilter, setDonnerFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [showDownload, setShowDownload] = useState(false);

  const trades = [
    "Electrical House Wiring",
    "Industrial Electrical Wiring",
    "Industrial Sewing",
    "Dressmaking & Tailoring",
    "Garments Machine Mechanics",
    "Computer Fundamentals",
    "Motorbike Mechanics",
    "Spoken English",
  ];

  const donners = ["GSRD", "PLANET"];

  /* ================= FETCH ================= */
  useEffect(() => {
    axiosSecure
      .get("/all-job-holders")
      .then((res) => {
        setJobHolders(res.data.data || []);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  /* ================= FILTER (ROBUST) ================= */
  useEffect(() => {
    let data = [...jobHolders];

    if (tradeFilter.length)
      data = data.filter((j) => tradeFilter.includes(j.trade?.trim()));

    if (genderFilter.length)
      data = data.filter((j) => genderFilter.includes(j.gender?.trim()));

    if (donnerFilter.length)
      data = data.filter((j) => donnerFilter.includes(j.donner?.trim()));

    if (search)
      data = data.filter((j) =>
        j.name?.toLowerCase().includes(search.toLowerCase())
      );

    if (sortBy === "az") data.sort((a, b) => a.name.localeCompare(b.name));

    if (sortBy === "created-date")
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFiltered(data);
    setShowDownload(false);
  }, [jobHolders, tradeFilter, genderFilter, donnerFilter, search, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setTradeFilter([]);
    setGenderFilter([]);
    setDonnerFilter([]);
    setSortBy("");
    setShowDownload(false);
  };

  if (loading) {
    return (
      <div className="p-20 text-center text-2xl font-bold">
        Loading job holders…
      </div>
    );
  }

  return (
    <div className="p-6 flex gap-6">
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

      {/* MAIN */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Job Holders ({filtered.length})
          </h2>

          {/* FIXED DOWNLOAD BUTTON */}
          {showDownload ? (
            <BlobProvider document={<JobholdersPDF data={filtered} />}>
              {({ blob, loading }) => {
                if (loading) {
                  return (
                    <span className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
                      Preparing PDF…
                    </span>
                  );
                }

                if (!blob) return null;

                // Smart dynamic filename
                const parts = [];

                if (tradeFilter.length > 0) {
                  parts.push(...tradeFilter.map((t) => t.replace(/\s+/g, "_")));
                }
                if (genderFilter.length > 0) {
                  parts.push(...genderFilter);
                }
                if (donnerFilter.length > 0) {
                  parts.push(...donnerFilter);
                }
                if (search.trim()) {
                  parts.push(`search_${search.trim()}`);
                }

                const filterName = parts.length > 0 ? parts.join("_") : "all";
                const fileName = `jobholders_${filterName}.pdf`;

                return (
                  <button
                    onClick={() => {
                      saveAs(blob, fileName);
                      // setShowDownload(false); // optional
                    }}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg cursor-pointer"
                  >
                    Download
                  </button>
                );
              }}
            </BlobProvider>
          ) : (
            <button
              onClick={() => setShowDownload(true)}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg cursor-pointer"
            >
              Generate PDF
            </button>
          )}
        </div>

        {/* PDF Preview */}
        <PDFViewer width="100%" height="900px" key={filtered.length}>
          <JobholdersPDF data={filtered} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default DownloadPDF;
