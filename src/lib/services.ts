import axios from "axios";
import Cookies from "js-cookie";
import {
  CommunityInterface,
  CommunityMembersInterface,
  FollowerInterface,
  FollowingInterface,
  LoginInterface,
  PostDetailsInterface,
  PostInterface,
  ReportedGroupsInterface,
  ReportedPostInterface,
  ReportedUsersInterface,
  UserDetailsInterface,
  UserInterface,
  GroupDetailsInterface,
  GroupInterface,
  NotificationInterface,
  CreateNotificationInterface,
  UserGrowthAnalytics,
} from "./types";

// Create an Axios instance
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin`,
  withCredentials: true,
  timeout: 10000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Retrieve token from storage
    if (token) {
      config.headers.Token = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove("token"); // Remove token if unauthorized
      window.location.href = "/login"; // Redirect to login page
    }
    console.log(error);
    console.log("API Error:", error.response?.data || error);
    return Promise.reject(error);
  }
);

// // Track if a refresh request is in progress
// let isRefreshing = false;
// let refreshSubscribers: ((token: string) => void)[] = [];

// // Response Interceptor (Handle 401)
// API.interceptors.response.use(
//   (response) => response, // If response is OK, return it
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           refreshSubscribers.push((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(API(originalRequest));
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const newToken = await refreshAccessToken();
//         isRefreshing = false;
//         refreshSubscribers.forEach((callback) => callback(newToken));
//         refreshSubscribers = [];

//         localStorage.setItem("token", newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//         return API(originalRequest); // Retry the original request
//       } catch (refreshError) {
//         isRefreshing = false;
//         refreshSubscribers = [];
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

const defaultLimit = 50;
const defaultPage = 1;

// Centralized Error Handling
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
  throw new Error(
    (error as any).message || error || "An Unexpected error occurred"
  );
};

const handleApiResponse = (response: any) => {
  const responseData = response.data;

  // Check if success is false and throw an error
  if (!responseData.success) {
    throw new Error(
      responseData.message || "Something went wrong, Please try again!"
    );
  }

  return responseData; // Only return the response data {status, message, data}
};

const apiHandler = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    const response = await apiCall();
    return handleApiResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 *
 * @param payload email: string, password: string
 * @returns api response or error
 */

// ########################### AUTH API's ###########################

const login = (payload: LoginInterface) =>
  apiHandler<{
    success: boolean;
    data: {
      admin: {
        fullName: string;
      };
      token: string;
    };
    message: string;
  }>(() => API.post(`/auth/login`, payload));

const forgotPassword = (email: string) =>
  apiHandler<{ success: boolean; message: string }>(() =>
    API.post(`/auth/forgetPassword`, { email })
  );

const verifyOtp = (otp: string, email: string) =>
  apiHandler<{ success: boolean; message: string }>(() =>
    API.post(`/auth/adminVerifyOtpForgetPassword`, { otp, email })
  );

const resetPassword = (
  email: string,
  password: string,
  confirmPassword: string
) =>
  apiHandler<{ success: boolean; message: string }>(() =>
    API.post(`/auth/adminResetPassword`, { password, confirmPassword, email })
  );

// ########################### USERS API's ###########################

const getAllUsers = (
  search: string = "",
  isSuspended: string,
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: {
      pagination: {
        currentPage: number;
        totalPages: number;
        totalUsers: number;
      };
      users: UserInterface[];
    };
  }>(() =>
    API.get(
      `/auth/all-users?page=${page}&limit=${limit}&search=${search}${isSuspended}`
    )
  );

const getUserById = (id: string) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: {
      user: UserDetailsInterface;
    };
  }>(() => API.get(`/auth/get-user-by-id/${id}`));

// ########################### POST API's ###########################

const getPostsOfUser = (
  id: string,
  page: number = defaultPage,
  limit: number = defaultLimit,
  postType: "all" | "normal" | "job" | "group" | "educational" = "all"
) =>
  apiHandler<{
    success: boolean;
    currentPage: number;
    totalPosts: number;
    totalPages: number;
    posts: PostInterface[];
  }>(() =>
    API.get(
      `/auth/get-all-posts-of-user/${id}?page=${page}&limit=${limit}&type=${postType}`
    )
  );

const getFollowersOfUser = (
  id: string,
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    count: number;
    currentPage: number;
    totalFollowers: number;
    totalPages: number;
    followers: FollowerInterface[];
  }>(() => API.get(`/auth/followers/${id}?page=${page}&limit=${limit}`));

const getFollowingsOfUser = (
  id: string,
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    currentPage: number;
    totalFollowings: number;
    totalPages: number;
    count: number;
    followings: FollowingInterface[];
  }>(() => API.get(`/auth/followings/${id}?page=${page}&limit=${limit}`));

const suspendUser = (id: string, suspend: boolean) =>
  apiHandler<{
    success: boolean;
    message: string;
    user: { isSuspended: boolean };
  }>(() => API.post(`/auth/suspendAccount/${id}`, { status: suspend }));

const deleteUser = (id: string) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() => API.delete(`/auth/deleteAccount/${id}`));

const getPostById = (id: string, type: string) =>
  apiHandler<{
    success: boolean;
    message: string;
    post: PostDetailsInterface;
    type: string;
  }>(() => API.get(`/auth/get-post/${id}/${type}`));

const deletePostById = (id: string, type: string) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() => API.delete(`/auth/delete-post/${id}/${type}`));

// ########################### COMMUNITY API's ###########################

const createCommunity = (title: string, description: string) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() => API.post(`/community/create-community`, { title, description }));

const updateCommunity = (id: string, title: string, description: string) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() =>
    API.patch(`/community/update-community/${id}`, { title, description })
  );

const getCommunities = (
  search: string,
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: {
      communities: CommunityInterface[];
      currentPage: number;
      totalCommunities: number;
      totalPages: number;
      searchQuery: string;
      hasSearch: boolean;
    };
  }>(() =>
    API.get(
      `/community/get-all-communities?search=${search}&page=${page}&limit=${limit}`
    )
  );

const getCommunityMembers = (
  id: string,
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: {
      community: CommunityInterface;
      members: CommunityMembersInterface[];
      currentPage: number;
      totalMembers: number;
      totalPages: number;
    };
  }>(() =>
    API.get(
      `/community/get-community-members/${id}?page=${page}&limit=${limit}`
    )
  );

const deleteCommunityById = (id: string) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() => API.delete(`/community/delete-community/${id}`));

const disableCommunity = (id: string, status: boolean) =>
  apiHandler<{
    success: boolean;
    message: string;
    community: { isDisabled: boolean };
  }>(() => API.put(`/community/disable-community/${id}`, { status }));

// ########################### REPORTS API's ###########################

const getReportedUsers = (
  search: string = "",
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    searchQuery: string;
    statusFilter: string;
    hasSearch: boolean;
    reports: ReportedUsersInterface[];
  }>(() =>
    API.get(
      `/report/get-user-reports?page=${page}&limit=${limit}&search=${search}`
    )
  );

const getReportedPosts = (
  postType: "" | "normal" | "job" | "group" | "educational" = "",
  search: string = "",
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    totalReports: number;
    currentPage: number;
    totalPages: number;
    reports: ReportedPostInterface[];
  }>(() =>
    API.get(
      `/report/get-reported-posts?page=${page}&limit=${limit}&status=${status}&postType=${postType}&search=${search}`
    )
  );

const getReportedGroups = (
  isDisabled: "" | boolean = "",
  search: string = "",
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    total: number;
    totalPages: number;
    reports: ReportedGroupsInterface[];
  }>(() =>
    API.get(
      `/report/get-group-reports?page=${page}&limit=${limit}&reason=&search=${search}`
    )
  );

// ########################### GROUP API's ###########################

const getAllGroups = (
  search: string = "",
  status: string = "",
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: {
      pagination: {
        currentPage: number;
        totalPages: number;
        totalGroups: number;
      };
      groups: GroupInterface[];
    };
  }>(() =>
    API.get(
      `/group/get-all-groups?page=${page}&limit=${limit}&search=${search}&status=${status}`
    )
  );

const getGroupById = (id: string) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: GroupDetailsInterface;
  }>(() => API.get(`/group/get-group/${id}`));

const deleteGroupById = (id: string) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() => API.delete(`/group/delete-group/${id}`));

const disableGroupById = (id: string, status: boolean) =>
  apiHandler<{
    success: boolean;
    message: string;
    group: { isDisabled: boolean };
  }>(() => API.put(`/group/disable-group/${id}`, { isDisabled: status }));

// ########################### NOTIFICATION API's ###########################

const getAllNotifications = (
  search: string = "",
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    success: boolean;
    message: string;
    notifications: NotificationInterface[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>(() =>
    API.get(
      `/auth/get-all-notifications?page=${page}&limit=${limit}&search=${search}`
    )
  );

const createNotification = (payload: CreateNotificationInterface) =>
  apiHandler<{
    success: boolean;
    message: string;
  }>(() => API.post(`/auth/createNotification`, payload));

// ########################### ANALYTICS API's ###########################

const getUserGrowthAnalytics = (startYear: string, endYear: string) =>
  apiHandler<{
    success: boolean;
    message: string;
    data: UserGrowthAnalytics;
  }>(() =>
    API.get(`/analytics/user-growth?startYear=${startYear}&endYear=${endYear}`)
  );

const api = {
  login,
  getAllUsers,
  getUserById,
  getPostsOfUser,
  getFollowersOfUser,
  getFollowingsOfUser,
  suspendUser,
  deleteUser,
  getPostById,
  forgotPassword,
  verifyOtp,
  resetPassword,
  deletePostById,
  createCommunity,
  updateCommunity,
  getCommunities,
  getCommunityMembers,
  deleteCommunityById,
  disableCommunity,
  getReportedUsers,
  getReportedPosts,
  getReportedGroups,
  getAllGroups,
  getGroupById,
  deleteGroupById,
  disableGroupById,
  getAllNotifications,
  createNotification,
  getUserGrowthAnalytics,
};
export default api;
