import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AllWorkplace = () => {
  const axiosSecure = useAxios();
  const [workplaces, setWorkplaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [totalworkplaces, setTotalworkplaces] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkplace, setSelectedWorkplace] = useState({
    _id: "",
    name: "",
    address: "",
  });

  // Fetch workplaces from backend
  useEffect(() => {
    const fetchWorkplaces = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/all-workplaces?limit=${limit}&skip=${currentPage * limit}`
        );
        if (Array.isArray(res.data.data)) {
          setWorkplaces(res.data.data);
          setTotalworkplaces(res.data.totalWorkplace);

          const pages = Math.ceil(res.data.totalWorkplace / limit);
          setTotalPage(pages);
        } else {
          setWorkplaces([]);
          toast.error("Invalid data format from server.");
        }
      } catch (err) {
        console.error("Error fetching workplaces:", err);
        toast.error("Failed to fetch workplaces.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkplaces();
  }, [axiosSecure, currentPage]);

  // Open modal for update
  const openUpdateModal = (wp) => {
    setSelectedWorkplace({ ...wp });
    setModalOpen(true);
  };

  // Handle update submit
  const handleUpdate = async () => {
    if (!selectedWorkplace.name || !selectedWorkplace.address) {
      toast.error("Name and address cannot be empty");
      return;
    }

    setUpdatingId(selectedWorkplace._id);
    try {
      const res = await axiosSecure.patch(
        `/update-workplace/${selectedWorkplace._id}`,
        {
          name: selectedWorkplace.name,
          address: selectedWorkplace.address,
        }
      );

      // Backend response: { message, data: { modifiedCount, ... } }
      if (res.data.data.modifiedCount > 0) {
        toast.success("Workplace updated successfully!");
        setWorkplaces((prev) =>
          prev.map((wp) =>
            wp._id === selectedWorkplace._id
              ? { ...wp, ...selectedWorkplace }
              : wp
          )
        );
        setModalOpen(false);
      } else {
        toast.info("No changes were made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update workplace");
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle delete with SweetAlert
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        const res = await axiosSecure.delete(`/delete-workplace/${id}`);
        if (res.data.data.deletedCount > 0) {
          toast.success("Workplace deleted successfully!");
          setWorkplaces((prev) => prev.filter((wp) => wp._id !== id));
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete workplace");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="min-h-screen py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        All Workplaces ({totalworkplaces})
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : workplaces.length === 0 ? (
        <p className="text-center text-gray-500">No workplaces found.</p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workplaces.map((wp, index) => (
                <tr key={wp._id}>
                  <td>{index + 1}</td>
                  <td>{wp.name}</td>
                  <td>{wp.address}</td>
                  <td>{new Date(wp.created_at).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openUpdateModal(wp)}
                      disabled={updatingId === wp._id}
                    >
                      {updatingId === wp._id ? "Updating..." : "Update"}
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(wp._id)}
                      disabled={deletingId === wp._id}
                    >
                      {deletingId === wp._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center flex-wrap gap-3 py-10">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            Prev
          </button>
        )}
        {[
          ...Array(totalPage)
            .keys()
            .map((i) => (
              <button
                onClick={() => setCurrentPage(i)}
                className={`btn ${i === currentPage && "btn-primary"}`}
              >
                {i + 1}
              </button>
            )),
        ]}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>

      {/* Update Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Workplace</h3>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              placeholder="Workplace Name"
              value={selectedWorkplace.name}
              onChange={(e) =>
                setSelectedWorkplace((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              placeholder="Workplace Address"
              value={selectedWorkplace.address}
              onChange={(e) =>
                setSelectedWorkplace((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setModalOpen(false)}
                disabled={updatingId === selectedWorkplace._id}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleUpdate}
                disabled={updatingId === selectedWorkplace._id}
              >
                {updatingId === selectedWorkplace._id
                  ? "Updating..."
                  : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWorkplace;
