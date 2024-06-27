import React from "react";
import { BiSolidPhone } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdEdit, MdEmail } from "react-icons/md";
import { PiGenderIntersexFill } from "react-icons/pi";
import { styleIcon } from "src/lib/data";
import { UsersType } from "src/lib/type";

interface UserCardProps {
  user: UsersType;
  onShowModalUpdate: (user: UsersType | null) => void;
  onShowModalDelete: (user: UsersType) => void;
}

const UserCard = ({
  user,
  onShowModalUpdate,
  onShowModalDelete,
}: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="username">{user.username}</div>
      <div className="id">Id: {user.id}</div>
      <div className="email">
        <MdEmail style={styleIcon} />
        {user.email}
      </div>
      <div className="phone">
        <BiSolidPhone style={styleIcon} />
        {user.phone}
      </div>
      <div className="gender">
        <PiGenderIntersexFill style={styleIcon} />
        {user.sex ? user.sex : "Other"}
      </div>
      <div className="group">
        <FaUserGroup style={styleIcon} />
        {user.Group ? user.Group.description : "Undefined"}
      </div>
      <div className="custom-button">
        <span
          title="Edit"
          className="edit fw-medium"
          onClick={() => onShowModalUpdate(user)}
        >
          <MdEdit style={{ width: 16, height: 16 }} />
        </span>
        <span
          title="Delete"
          className="delete fw-medium"
          onClick={() => onShowModalDelete(user)}
        >
          <MdDelete style={{ width: 16, height: 16 }} />
        </span>
      </div>
    </div>
  );
};

export default UserCard;
