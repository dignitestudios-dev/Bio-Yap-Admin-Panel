import api from "@/lib/services";
import { utils } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateCommunity = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateCommunity = async (
    id: string,
    title: string,
    description: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      if (!title) {
        toast.error("Community name is required");
        return false;
      }
      if (!description) {
        toast.error("Community description is required");
        return false;
      }

      const response = await api.updateCommunity(id, title, description);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateCommunity };
};

const useDisableCommunity = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const disableCommunity = async (
    id: string,
    status: boolean
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.disableCommunity(id, status);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, disableCommunity };
};

const useDisableGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const disableGroup = async (id: string, status: boolean): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.disableGroupById(id, status);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, disableGroup };
};

export const updateHooks = {
  useUpdateCommunity,
  useDisableCommunity,
  useDisableGroup,
};
