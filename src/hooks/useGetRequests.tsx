import api from "@/lib/services";
import {
  CommunityInterface,
  CommunityMembersInterface,
  FollowerInterface,
  FollowingInterface,
  GroupDetailsInterface,
  GroupInterface,
  OrderDetailsInterface,
  OrderInterface,
  PostDetailsInterface,
  PostInterface,
  ProductInterface,
  ReportedGroupsInterface,
  ReportedPostInterface,
  ReportedUsersInterface,
  UserDetailsInterface,
  UserInterface,
} from "@/lib/types";
import { utils } from "@/lib/utils";
import { useState } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllUsers = async (
    search: string,
    selectedTab: "0" | "1" | "2" | "" = "0",
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const isSuspendedBoolean: string =
        selectedTab === "" || selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? "&isSuspended=false"
          : selectedTab === "2"
          ? "&isSuspended=true"
          : "";

      const response = await api.getAllUsers(
        search,
        isSuspendedBoolean,
        page,
        limit
      );
      setUsers(response?.data?.users);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, users, totalPages, getAllUsers };
};
const useGetAllOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllOrders = async (
    search: string,
    orderStatus: string = "",
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getAllOrders(search, orderStatus, page, limit);

      setOrders(response?.orders);
      setTotalPages(response?.pagination?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, orders, totalPages, getAllOrders };
};

const useGetOrdersDetails = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetailsInterface | null>(null);

  const getOrderById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.getOrderById(id);
      console.log("User details API call: ", response);
      setOrder(response?.order);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, order, setOrder, getOrderById };
};
const useGetUsersDetails = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetailsInterface | null>(null);

  const getUserById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.getUserById(id);
      console.log("User details API call: ", response);
      setUser(response?.data?.user);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, setUser, getUserById };
};

const useGetUserPostsById = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getPostsOfUser = async (
    id: string,
    selectedTab: "0" | "1" | "2" | "3" | "4" = "0",
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const postType: "all" | "normal" | "job" | "educational" | "group" =
        selectedTab === "0"
          ? "all"
          : selectedTab === "1"
          ? "normal"
          : selectedTab === "2"
          ? "job"
          : selectedTab === "3"
          ? "educational"
          : selectedTab === "4"
          ? "group"
          : "all";

      const response = await api.getPostsOfUser(id, page, limit, postType);
      console.log("User posts API call: ", response);
      setPosts(response?.posts);
      setTotalPages(response?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, posts, totalPages, getPostsOfUser };
};

const useGetPostDetails = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostDetailsInterface | null>(null);

  const getPostById = async (id: string, type: string) => {
    setLoading(true);
    try {
      const response = await api.getPostById(id, type);
      console.log("Post details API call: ", response);
      setPost({ ...response?.post, type: response?.type });
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, post, getPostById };
};

const useGetUserFollowersById = () => {
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState<FollowerInterface[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getFollowersOfUser = async (
    id: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getFollowersOfUser(id, page, limit);
      console.log("User followers API call: ", response);
      setFollowers(response?.followers);
      // setTotalPages(response?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, followers, totalPages, getFollowersOfUser };
};

const useGetUserFollowingsById = () => {
  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState<FollowingInterface[] | null>(
    null
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const getFollowingsOfUser = async (
    id: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getFollowingsOfUser(id, page, limit);
      console.log("User followings API call: ", response);
      setFollowings(response?.followings);
      // setTotalPages(response?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, followings, totalPages, getFollowingsOfUser };
};

const useGetCommunities = () => {
  const [loading, setLoading] = useState(false);
  const [communities, setCommunities] = useState<CommunityInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getCommunities = async (
    search: string,
    page?: number,
    limit?: number
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.getCommunities(search, page, limit);
      setCommunities(response?.data?.communities);
      setTotalPages(response?.data?.totalPages);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, totalPages, communities, getCommunities };
};

const useGetCommunityDetails = () => {
  const [loading, setLoading] = useState(false);
  const [communityDetails, setCommunityDetails] = useState<{
    community: CommunityInterface;
    members: CommunityMembersInterface[];
  }>({
    community: {} as CommunityInterface,
    members: [],
  });
  const [totalPages, setTotalPages] = useState<number>(1);

  const getCommunityMembers = async (
    id: string,
    page?: number,
    limit?: number
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.getCommunityMembers(id, page, limit);
      setCommunityDetails({
        community: response?.data?.community,
        members: response?.data?.members,
      });
      setTotalPages(response?.data?.totalPages);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, totalPages, communityDetails, getCommunityMembers };
};

const useGetReportedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [reportedUsers, setReportedUsers] = useState<
    ReportedUsersInterface[] | null
  >(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getReportedUsers = async (
    search?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getReportedUsers(search, page, limit);
      console.log("Reported users API call: ", response);
      setReportedUsers(response?.reports);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, reportedUsers, totalPages, getReportedUsers };
};

const useGetReportedPosts = () => {
  const [loading, setLoading] = useState(true);
  const [reportedPosts, setReportedPosts] = useState<
    ReportedPostInterface[] | null
  >(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getReportedPosts = async (
    selectedTab: "0" | "1" | "2" | "3" | "4" = "0",
    search?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const postType: "" | "normal" | "job" | "educational" | "group" =
        selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? "normal"
          : selectedTab === "2"
          ? "job"
          : selectedTab === "3"
          ? "educational"
          : selectedTab === "4"
          ? "group"
          : "";

      const response = await api.getReportedPosts(
        postType,
        search,
        page,
        limit
      );
      console.log("Reported posts API call: ", response);
      setReportedPosts(response?.reports);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, reportedPosts, totalPages, getReportedPosts };
};

const useGetReportedGroups = () => {
  const [loading, setLoading] = useState(true);
  const [reportedGroups, setReportedGroups] = useState<
    ReportedGroupsInterface[] | null
  >(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getReportedGroups = async (
    selectedTab?: "0" | "1" | "2",
    search?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const isDisabled: "" | boolean =
        selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? false
          : selectedTab === "2"
          ? false
          : "";
      const response = await api.getReportedGroups(
        isDisabled,
        search,
        page,
        limit
      );
      console.log("Reported groups API call: ", response);
      setReportedGroups(response?.reports);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, reportedGroups, totalPages, getReportedGroups };
};

const useGetAllGroups = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllGroups = async (
    search: string,
    selectedTab: "0" | "1" | "2" = "0",
    page?: number,
    limit?: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const status: string =
        selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? "active"
          : selectedTab === "2"
          ? "inactive"
          : "";

      const response = await api.getAllGroups(search, status, page, limit);
      setGroups(response?.data?.groups);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, groups, totalPages, getAllGroups };
};

const useGetGroupDetails = () => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<GroupDetailsInterface | null>(null);

  const getGroupById = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getGroupById(id);
      setGroup(response?.data);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, group, getGroupById };
};

const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getProducts = async (
    search: string,
    page?: number,
    limit?: number
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.getProducts(search, page, limit);
      setProducts(response?.data?.products);
      setTotalPages(response?.data?.totalPages);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, totalPages, products, getProducts };
};

const useGetProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductInterface | null>(null);

  const getProductById = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getProductById(id);
      setProduct(response?.data?.product);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, product, getProductById };
};

const useGetWithdrawalRequests = () => {
  const [loading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getWithdrawals = async (
    status: string = "pending",
    page?: number,
    limit?: number
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.getWithdrawalRequests(status, page, limit);
      setWithdrawals(response?.data?.withdrawals || []);
      setTotalPages(response?.data?.totalPages || 1);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, withdrawals, totalPages, getWithdrawals };
};

export const getHooks = {
  useGetAllUsers,
  useGetUsersDetails,
  useGetUserPostsById,
  useGetUserFollowersById,
  useGetUserFollowingsById,
  useGetPostDetails,
  useGetCommunities,
  useGetCommunityDetails,
  useGetReportedUsers,
  useGetReportedPosts,
  useGetReportedGroups,
  useGetAllGroups,
  useGetGroupDetails,
  useGetProducts,
  useGetProductDetails,
  useGetWithdrawalRequests,
  useGetAllOrders,
  useGetOrdersDetails,
};
