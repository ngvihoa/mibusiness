import { useEffect, useState } from "react";
import { deleteUser } from "src/services/userService";
import { toast } from "react-toastify";
import ModalConfirm from "src/components/modal-confirm/modal-confirm";
import { GroupDBGet, ModalTextProps, UsersType } from "src/lib/type";
import ModalUser from "./modal-user";
import { LuRefreshCw } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import useAuth from "src/hooks/auth.hook";
import { handleError } from "src/lib/func";
import UserCard from "./user-card";
import FillButton from "src/components/button/fill-button";
import LineButton from "src/components/button/line-button";
import { fetchGroups } from "src/services/groupService";
import GroupCard from "./group-card";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const UserGroup = () => {
  const { handleLogOut } = useAuth();
  // confirm delete user states
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [modalText, setModalText] = useState<ModalTextProps>(initModal);

  const [dataModal, setDataModal] = useState<GroupDBGet | null>(null);
  const [groupList, setGroupList] = useState<GroupDBGet[] | null>(null);

  const fetchGroupList = async () => {
    try {
      let data = await fetchGroups();
      setGroupList(data.DT);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Access to config, request, and response
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        }
      }
    }
  };

  // function for delete user
  const handleCloseModalConfirmDelete = () => {
    setDataModal(null);
    setShowModalConfirmDelete(false);
  };
  const handleShowModalConfirmDelete = (group: GroupDBGet) => {
    setModalText({
      headingText: "Delete user group",
      bodyText:
        "Do you really want to delete group: " +
        group.id +
        " - " +
        group.name +
        "?",
    });
    setDataModal(group);
    setShowModalConfirmDelete(true);
  };
  const handleConfirmDelete = async () => {
    try {
      if (dataModal) {
        let data = await deleteUser(+dataModal.id);
        toast.success(data.EM);
        await fetchGroupList();
        handleCloseModalConfirmDelete();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Access to config, request, and response
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        }
      }
    }
  };

  // fetching on mount
  useEffect(() => {
    fetchGroupList();
  }, []);

  return (
    <>
      <div className="user-group-container">
        <div className="content-container">
          <div className="header-container">
            <h3 className="m-0">Group list</h3>
          </div>
          <div className="container-fluid overflow-x-auto group-container">
            {groupList && groupList.length > 0 ? (
              <>
                {groupList.map((item, index) => (
                  <GroupCard
                    key={`user-${index}-${item.id}`}
                    onShowModalDelete={handleShowModalConfirmDelete}
                    group={item}
                  />
                ))}
              </>
            ) : (
              <div>Not found groups...</div>
            )}
          </div>
        </div>
      </div>
      <ModalConfirm
        show={showModalConfirmDelete}
        text={modalText}
        handleClose={handleCloseModalConfirmDelete}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default UserGroup;
