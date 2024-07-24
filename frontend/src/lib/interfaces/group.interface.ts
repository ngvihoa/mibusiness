export type GroupPostType = {
  name: string;
  description: string;
};

export type GroupType = {
  id: number;
} & GroupPostType;

export type GroupDBGet = GroupType & {
  createdAt: string;
  updatedAt: string;
};

export type GroupRoleType = {
  groupId: number;
  roleId: number;
};
