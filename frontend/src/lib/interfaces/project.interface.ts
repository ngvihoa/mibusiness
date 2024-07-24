export type ProjectPostType = {
  name: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  customerId: number | null;
};

interface UserType {
  id: number;
  username: string;
}

export type ProjectDBGet = ProjectPostType & {
  id: number;
  User: UserType | null;
};
