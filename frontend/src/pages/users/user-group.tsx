import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalConfirm from "components/modal/modal-confirm";
import axios from "axios";
import useAuth from "hooks/auth.hook";
import { handleError } from "lib/func";
import { deleteGroup, fetchGroups } from "services/groupService";
import { GroupDBGet, ModalTextProps } from "lib/type";
import GeneralLayout from "components/layout/general-layout";
import FillButton from "components/button/fill-button";
import LineButton from "components/button/line-button";
import { FaFilter } from "react-icons/fa6";
import { styleIcon, styleIconSm } from "lib/data";
import { Table } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

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
      setGroupList(data.data);
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
        let data = await deleteGroup(dataModal);
        toast.success(data.message);
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
      <GeneralLayout
        classContainer="user-group-container"
        name="Group Management"
      >
        <div className="search-bar form-group d-flex gap-2">
          <input
            type="text"
            placeholder="Search group user..."
            className="form-control"
          />
          <FillButton>Search</FillButton>
        </div>
        <div className="table-container">
          <Table responsive="lg" className="">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groupList && groupList.length > 0 ? (
                <>
                  {groupList.map((item, index) => (
                    <tr key={`user-${index}-${item.id}`}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description ?? "No description"}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <LineButton
                            className="fw-medium"
                            onClickFunction={() => {}}
                            // new feature
                            // onClickFunction={() =>
                            //   handleShowModalUpdateUser(item)
                            // }
                          >
                            <MdEdit style={styleIconSm} />
                          </LineButton>
                          <FillButton
                            className="fw-medium"
                            onClickFunction={() =>
                              handleShowModalConfirmDelete(item)
                            }
                          >
                            <MdDelete style={styleIconSm} />
                          </FillButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div>Not found groups...</div>
              )}
            </tbody>
          </Table>
        </div>
      </GeneralLayout>
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
