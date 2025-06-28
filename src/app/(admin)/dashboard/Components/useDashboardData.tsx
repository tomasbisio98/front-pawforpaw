"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface DashboardData {
  totalDogs: number;
  totalProducts: number;
  totalUsers: number;
  totalDonations: number;
  topDonatedDogs: { name: string; donations: number }[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}dashboard`);
        setData(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
