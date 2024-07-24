import React from "react";
import { MdDelete } from "react-icons/md";
import { styleIconSm } from "lib/data";
import FillButton from "components/button/fill-button";
import { GroupDBGet } from "lib/interfaces/group.interface";

interface UserCardProps {
  group: GroupDBGet;
  onShowModalDelete: (group: GroupDBGet) => void;
}

const GroupCard = ({ group, onShowModalDelete }: UserCardProps) => {
  return (
    <div className="group-card">
      <div className="name">{group.name}</div>
      <div className="id">Id: {group.id}</div>
      <div className="desc">{group.description ?? "No description"}</div>
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
