import { useEffect, useState } from "react";
import { deleteUser, fetchAllUsers } from "services/userService";
import { toast } from "react-toastify";
import ModalConfirm from "components/modal/modal-confirm";
import { ModalTextProps, UsersType } from "lib/type";
import ModalUser from "./modal-user";
import { LuRefreshCw } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import useAuth from "hooks/auth.hook";
import { handleError } from "lib/func";
import usePagination from "hooks/pagination.hook";
import PaginationBar from "components/pagination-bar/pagination-bar";
import FillButton from "components/button/fill-button";
import LineButton from "components/button/line-button";
import GeneralLayout from "components/layout/general-layout";
import { FaFilter } from "react-icons/fa6";
import { styleIcon, styleIconSm } from "lib/data";
import { Table } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalAlert from "components/modal/modal-alert";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const UserList = () => {
  const { handleLogOut } = useAuth();
  // confirm delete user states
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [modalText, setModalText] = useState<ModalTextProps>(initModal);

  const [dataModal, setDataModal] = useState<UsersType | null>(null);
  const [userList, setUserList] = useState<UsersType[] | null>(null);

  const {
    pageCount,
    setPageCount,
    currentPage,
    itemsPerPage,
    handlePageClick,
  } = usePagination(10);

  const fetchUsers = async () => {
    try {
      let data = await fetchAllUsers(currentPage, itemsPerPage);
      setPageCount(data.DT.totalPages);
      setUserList(data.DT.users);
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
  const handleShowModalConfirmDelete = (user: UsersType) => {
    setModalText({
      headingText: "Delete user",
      bodyText:
        "Do you really want to delete user: " +
        user.id +
        " - " +
        user.username +
        "?",
    });
    setDataModal(user);
    setShowModalConfirmDelete(true);
  };
  const handleConfirmDelete = async () => {
    try {
      if (dataModal) {
        let data = await deleteUser(+dataModal.id);
        toast.success(data.EM);
        await fetchUsers();
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

  // function for create/edit user
  const handleCloseModalUpdateUser = () => {
    setDataModal(null);
    setShowModalUpdateUser(false);
  };
  const handleShowModalUpdateUser = (user: UsersType | null) => {
    setModalText({
      headingText: user ? "Edit user" : "Create a new user",
      bodyText: "",
    });
    if (user) setDataModal(user);
    setShowModalUpdateUser(true);
  };
  const handleConfirmUpdateUser = async () => {
    await fetchUsers();
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  // fetching on mount
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <>
      <GeneralLayout
        classContainer="user-list-container"
        name="User Management"
      >
        <div className="search-bar form-group d-flex gap-2">
          <input
            type="text"
            placeholder="Search user..."
            className="form-control"
          />
          <FillButton>Search</FillButton>
          <LineButton onClickFunction={() => {}}>
            <FaFilter style={styleIcon} />
          </LineButton>
        </div>
        <div className="table-action d-flex justify-content-end">
          <LineButton onClickFunction={handleRefresh}>
            <LuRefreshCw /> Refresh
          </LineButton>
          <FillButton
            className="ms-1"
            onClickFunction={() => handleShowModalUpdateUser(null)}
          >
            <FiPlusCircle /> Add new user
          </FillButton>
        </div>
        <div className="table-container">
          <Table responsive="lg" className="">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Group</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList && userList.length > 0 ? (
                <>
                  {userList.map((item, index) => (
                    <tr key={`user-${index}-${item.id}`}>
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.Group ? item.Group.name : "None"}</td>
                      <td>{item.sex}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <LineButton
                            className="fw-medium"
                            onClickFunction={() =>
                              handleShowModalUpdateUser(item)
                            }
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
                <div>Not found users...</div>
              )}
            </tbody>
          </Table>
        </div>
        {pageCount > 0 && (
          <PaginationBar
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        )}
      </GeneralLayout>
      <ModalConfirm
        show={showModalConfirmDelete}
        text={modalText}
        handleClose={handleCloseModalConfirmDelete}
        handleConfirm={handleConfirmDelete}
      />
      <ModalUser
        show={showModalUpdateUser}
        text={modalText}
        handleClose={handleCloseModalUpdateUser}
        handleConfirm={handleConfirmUpdateUser}
        existData={dataModal}
      />
    </>
  );
};

export default UserList;
