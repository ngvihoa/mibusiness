import React from "react";
import { BiSolidPhone } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdEdit, MdEmail } from "react-icons/md";
import { PiGenderIntersexFill } from "react-icons/pi";
import { styleIcon, styleIconSm } from "src/lib/data";
import { GroupDBGet } from "src/lib/type";
import FillButton from "../button/fill-button";
import LineButton from "../button/line-button";

interface UserCardProps {
  group: GroupDBGet;
  onShowModalDelete: (group: GroupDBGet) => void;
}

const GroupCard = ({ group, onShowModalDelete }: UserCardProps) => {
  return (
    <div className="group-card">
      <div className="name">{group.name}</div>
      <div className="id">Id: {group.id}</div>
      <div className="desc">{group.description}</div>
      <div className="custom-button">
        <FillButton
          className="fw-medium"
          onClickFunction={() => onShowModalDelete(group)}
        >
          <MdDelete style={styleIconSm} />
        </FillButton>
      </div>
    </div>
  );
};

export default GroupCard;
