import axios from "axios";
import { useEffect, useState } from "react";

const useJobs = (category, search, sort) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs?category=${category}&search=${search}&sort=${sort}`);
      setJobs(data);
      setLoading(false);
    };
    fetchAllJobs();
  }, [category, search, sort]);

  return { jobs, loading };
};

export default useJobs;
