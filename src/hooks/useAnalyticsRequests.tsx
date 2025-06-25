import { useState } from "react";
import api from "@/lib/services";
import { UserGrowthAnalytics } from "@/lib/types";
import { utils } from "@/lib/utils";

const useUserGrowthAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<UserGrowthAnalytics>({
    totalActiveUsers: 0,
    userGrowthData: [],
  });

  const getUserGrowthAnalytics = async (startYear: string, endYear: string) => {
    setLoading(true);
    try {
      const response = await api.getUserGrowthAnalytics(startYear, endYear);
      setAnalytics(response.data);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, analytics, getUserGrowthAnalytics };
};

export const analyticsHooks = {
  useUserGrowthAnalytics,
};
