import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useState } from "react";
import api, { setAuthToken } from "../lib/services";
import { CommunityInterface, LoginInterface } from "../lib/types";
import { useRouter } from "next/navigation";
import { utils } from "@/lib/utils";

const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (payload: LoginInterface) => {
    setLoading(true);

    try {
      const { email, password } = payload;

      if (!email && !password) {
        toast.error("Email and password are required");
        return;
      } else if (!email) {
        toast.error("Email is required");
        return;
      } else if (!password) {
        toast.error("Password is required");
        return;
      }

      console.log("Login API goes");

      const data = await api.login(payload);

      toast.success(data?.message);

      Cookies.set("token", data?.data?.token);
      Cookies.set("admin", JSON.stringify(data?.data?.admin));
      // Ensure axios instances include the Authorization header immediately
      setAuthToken(data?.data?.token);
      router.push("/");
    } catch (error: any) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const useToggleSuspendUser = () => {
  const [loading, setLoading] = useState(false);

  const toggleSuspendUser = async (
    id: string,
    suspendUser: boolean
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.suspendUser(id, suspendUser);
      toast.success(response?.message);

      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleSuspendUser };
};

const useForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!email) {
        toast.error("Email is required");
        return false;
      }

      const response = await api.forgotPassword(email);
      Cookies.set("email", email);
      toast.success(response?.message);
      router.push("/verification");
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgotPassword };
};

const useVerifyOtp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!otp || otp.length !== 6) router.push("/reset-password");

      const email = Cookies.get("email");
      if (!email) {
        toast.error("Credentials error");
        router.push("/forgot-password");
        return false;
      }

      const response = await api.verifyOtp(otp, email);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, verifyOtp };
};

const useResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const resetPassword = async (
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      if (!password && !confirmPassword) {
        toast.error("All are required fields");
        return false;
      } else if (!password) {
        toast.error("New password field is required");
        return false;
      } else if (!confirmPassword) {
        toast.error("Re-enter password field is required");
        return false;
      }

      if (password !== confirmPassword) {
        toast.error("Password and confirm password must be same");
        return false;
      }

      const email = Cookies.get("email");
      if (!email) {
        toast.error("Credentials error");
        router.push("/forgot-password");
        return false;
      }

      const response = await api.resetPassword(
        email,
        password,
        confirmPassword
      );
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

const useCreateCommunity = () => {
  const [loading, setLoading] = useState(false);

  const createCommunity = async (
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

      const response = await api.createCommunity(title, description);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createCommunity };
};

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);

  const createProduct = async (
    title: string,
    quantity: number,
    price: number,
    description: string,
    files: File[]
  ): Promise<boolean> => {
    setLoading(true);
    try {
      if (!title) {
        toast.error("Product title is required");
        return false;
      }
      if (!description) {
        toast.error("Product description is required");
        return false;
      }
      if (!price) {
        toast.error("Product price is required");
        return false;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("quantity", String(quantity));
      formData.append("price", String(price));
      formData.append("description", description);

      files.forEach((f) => {
        formData.append("file", f);
      });

      const response = await api.createProduct(formData);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createProduct };
};

const useProcessWithdrawal = () => {
  const [loading, setLoading] = useState(false);

  const accept = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.acceptWithdrawal(id);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // const reject = async (id: string, reason?: string): Promise<boolean> => {
  //   setLoading(true);
  //   try {
  //     const response = await api.rejectWithdrawal(id);
  //     toast.success(response?.message);
  //     return true;
  //   } catch (error) {
  //     utils.handleError(error);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { loading, accept };
};

export const postHooks = {
  useLogin,
  useToggleSuspendUser,
  useForgotPassword,
  useVerifyOtp,
  useResetPassword,
  useCreateCommunity,
  useCreateProduct,
  useProcessWithdrawal,
};
