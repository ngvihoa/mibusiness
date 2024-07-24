import { GroupType } from "lib/interfaces/group.interface";

export type UsersType = {
  id: string;
  email: string;
  username: string;
  phone: string;
  sex: string;
  address: string;
  Group: GroupType | null;
};

export type createUserFormProps = {
  [key: string]: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  sex: string;
  groupId: string;
  address: string;
};

export type createUserFormStateProps = {
  email: boolean;
  username: boolean;
  phone: boolean;
  password: boolean;
  sex?: boolean;
  groupId: boolean;
  address?: boolean;
};
