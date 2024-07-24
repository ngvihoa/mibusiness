export type RoleType = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  description: string;
};

export type RoleDBType = {
  id: number;
  method: string;
  url: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};
