import { MdDelete } from "react-icons/md";
import { styleIconSm } from "lib/data";
import FillButton from "components/button/fill-button";
import { RoleDBType } from "lib/type";

interface RoleCardProps {
  role: RoleDBType;
  openModalConfirm: (role: RoleDBType) => void;
}

const RoleCard = ({ role, openModalConfirm }: RoleCardProps) => {
  return (
    <div className="role-child">
      <p>{role.url}</p>
      <p>Id: {role.id}</p>
      <p>
        {!role.description || role.description === ""
          ? "No description"
          : role.description}
      </p>
      <FillButton onClickFunction={() => openModalConfirm(role)}>
        <MdDelete style={styleIconSm} />
      </FillButton>
    </div>
  );
};

export default RoleCard;
