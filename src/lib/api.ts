import { AuthToken } from "../types/auth";
import { PaginatedUserList, User } from "../types/user";
import axiosInstance from "./axios";

export const authenticateUser = async (
  username: string,
  inviteCode?: string
): Promise<AuthToken> => {
  const res = await axiosInstance.post(
    "/authenticate",
    { username, inviteCode },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.token as AuthToken;
};

export const getAuthenticatedUser = async (): Promise<User> => {
  const res = await axiosInstance.get("/users/me");
  return res.data;
};

export const getUsers = async (): Promise<PaginatedUserList> => {
  const res = await axiosInstance.get("/users");
  return res.data;
};
