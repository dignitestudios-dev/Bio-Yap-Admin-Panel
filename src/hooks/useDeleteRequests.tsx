import { toast } from "react-hot-toast";
import { useState } from "react";
import api from "../lib/services";
import { utils } from "@/lib/utils";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.deleteUser(id);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteUser };
};

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);

  const deletePost = async (id: string, type: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.deletePostById(id, type);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deletePost };
};

const useDeleteCommunity = () => {
  const [loading, setLoading] = useState(false);

  const deleteCommunity = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.deleteCommunityById(id);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteCommunity };
};

const useDeleteGroup = () => {
  const [loading, setLoading] = useState(false);

  const deleteGroup = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.deleteGroupById(id);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteGroup };
};

export const deleteHooks = {
  useDeleteUser,
  useDeletePost,
  useDeleteCommunity,
  useDeleteGroup,
};
