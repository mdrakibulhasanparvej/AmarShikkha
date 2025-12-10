import { useState, useEffect } from "react";
import useAxios from "./useAxios";
import { toast } from "react-toastify";

export const useWorkplacesWithAutoAddress = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  const fetchWorkplaces = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/all-workplaces");
      if (Array.isArray(res.data.data)) {
        setWorkplaces(res.data.data);
      } else {
        setWorkplaces([]);
        toast.error("Invalid data format from server.");
      }
    } catch (err) {
      console.error("Error fetching workplaces:", err);
      toast.error("Failed to load workplaces.");
      setWorkplaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkplaces();
  }, []);

  // Helper: get address by workplace name
  const getAddressByWorkplace = (workplaceName) => {
    const found = workplaces.find((w) => w.name === workplaceName);
    return found ? found.address : "";
  };

  // Helper: list of names only (for <select>)
  const workplaceNames = workplaces.map((w) => w.name);

  return {
    workplaces,
    workplaceNames,
    loading,
    getAddressByWorkplace,
    refetch: fetchWorkplaces, // optional: manual refresh
  };
};
