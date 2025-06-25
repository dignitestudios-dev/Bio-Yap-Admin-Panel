import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/services";
import { utils } from "@/lib/utils";
import {
  CreateNotificationInterface,
  NotificationInterface,
} from "@/lib/types";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const getNotifications = async (
    search: string = "",
    page?: number,
    limit?: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getAllNotifications(search, page, limit);
      setNotifications(response.notifications);
      setTotalPages(response.pagination.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, notifications, totalPages, getNotifications };
};

const useCreateNotification = () => {
  const [loading, setLoading] = useState(false);

  const createNotification = async (
    data: CreateNotificationInterface
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Combine into a single datetime string in local time
      const localDateTime = new Date(`${data.date}T${data.time}`);

      // Convert to UTC string
      const scheduledTime = localDateTime.toISOString();

      const response = await api.createNotification({
        ...data,
        scheduledTime,
      });
      toast.success(response.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createNotification };
};

export const notificationHooks = {
  useGetNotifications,
  useCreateNotification,
};
