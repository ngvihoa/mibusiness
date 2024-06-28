import { useEffect, useState } from "react";
import { deleteUser, fetchAllUsers } from "src/services/userService";
import { toast } from "react-toastify";
import ModalConfirm from "src/components/modal-confirm/modal-confirm";
import { ModalTextProps, UsersType } from "src/lib/type";
import ModalUser from "./modal-user";
import { LuRefreshCw } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import useAuth from "src/hooks/auth.hook";
import { handleError } from "src/lib/func";
import usePagination from "src/hooks/pagination.hook";
import PaginationBar from "src/components/paginate-bar/pagination-bar";
import UserCard from "./user-card";
import FillButton from "../button/fill-button";
import LineButton from "../button/line-button";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const Users = () => {
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
  } = usePagination(6);

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
      <div className="manage-users-container container-fluid px-0 mx-0 container-md mx-md-auto">
        <div className="row">
          <div className="table-user-info mt-3 p-0">
            <div className="header-container mb-3">
              <h3 className="m-0">Manage users</h3>
              <div className="actions">
                <LineButton variant="primary" onClickFunction={handleRefresh}>
                  <LuRefreshCw /> Refresh
                </LineButton>
                <FillButton
                  className="ms-1"
                  variant="primary"
                  onClickFunction={() => handleShowModalUpdateUser(null)}
                >
                  <FiPlusCircle /> Add new user
                </FillButton>
              </div>
            </div>
            <div className="container-fluid overflow-x-auto user-container">
              {userList && userList.length > 0 ? (
                <>
                  {userList.map((item, index) => (
                    <UserCard
                      key={`user-${index}-${item.id}`}
                      onShowModalDelete={handleShowModalConfirmDelete}
                      onShowModalUpdate={handleShowModalUpdateUser}
                      user={item}
                    />
                  ))}
                </>
              ) : (
                <div>Not found users...</div>
              )}
            </div>
            {pageCount > 0 && (
              <div className="table-footer-container">
                <PaginationBar
                  handlePageClick={handlePageClick}
                  pageCount={pageCount}
                />
              </div>
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

export default Users;
