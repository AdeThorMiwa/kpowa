import { AuthToken } from "../types/auth";
import { GetUserQueryParam, PaginatedUserList, User } from "../types/user";
import axiosInstance from "./axios";

export const authenticateUser = async (
  username: string,
  invitationCode?: string
): Promise<AuthToken> => {
  const res = await axiosInstance.post(
    "/authenticate",
    { username, invitationCode },
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

export const getUsers = async ({
  username,
  page,
}: GetUserQueryParam): Promise<PaginatedUserList> => {
  const res = await axiosInstance.get(
    `/users?page=${page}${username ? `&username=${username}` : ""}`
  );
  return res.data;
};
