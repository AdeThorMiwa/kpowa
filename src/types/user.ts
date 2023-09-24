export type User = {
  username: string;
  referrals: number;
  inviteCode: string;
};

export type PaginatedUserList = {
  users: User[];
  hasNext: boolean;
  hasPrev: boolean;
  currentPage: number;
  totalPages: number;
};

export type GetUserQueryParam = {
  username?: string;
  page: number;
};
