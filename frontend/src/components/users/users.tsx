import { useEffect, useState } from "react";
import { deleteUser, fetchAllUsers } from "src/services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalConfirm from "./modal-confirm";
import { ModalTextProps, UsersType } from "src/lib/type";
import ModalUser from "./modal-user";
import { MdDelete, MdEdit } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import "./users.scss";
import axios from "axios";
import useAuth from "src/hooks/auth.hook";
import { useNavigate } from "react-router-dom";
import { handleError } from "src/lib/func";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const Users = () => {
  const { handleLogOut } = useAuth();
  const navigate = useNavigate();
  // confirm delete user states
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [modalText, setModalText] = useState<ModalTextProps>(initModal);

  const [dataModal, setDataModal] = useState<UsersType | null>(null);
  // pagination states
  const [userList, setUserList] = useState<UsersType[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
          navigate("/login");
        }
      }
    }
  };

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
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
          navigate("/login");
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
      <div className="manage-users-container container-fluid px-4 mx-0 container-md mx-md-auto">
        <div className="row">
          <div className="table-user-info mt-3 p-0">
            <div className="row d-flex flex-row justify-content-between align-items-center mb-3">
              <h3 className="col m-0">Manage users</h3>
              <div className="actions col text-end">
                <button className="btn btn-success" onClick={handleRefresh}>
                  <LuRefreshCw /> Refresh
                </button>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => handleShowModalUpdateUser(null)}
                >
                  <FiPlusCircle /> Add new user
                </button>
              </div>
            </div>
            <div className="container-fluid mx-0 px-0 overflow-x-auto">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Group</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList && userList.length > 0 ? (
                    <>
                      {userList.map((item, index) => (
                        <tr key={`row-${index}`}>
                          <td>
                            {index + (currentPage - 1) * itemsPerPage + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.sex ? item.sex : "NULL"}</td>
                          <td>
                            {item.Group ? item.Group.description : "NULL"}
                          </td>
                          <td className="custom-button h-100">
                            <span
                              title="Edit"
                              className="edit fw-medium"
                              onClick={() => handleShowModalUpdateUser(item)}
                            >
                              <MdEdit style={{ width: 16, height: 16 }} />
                            </span>
                            <span
                              title="Delete"
                              className="delete fw-medium"
                              onClick={() => handleShowModalConfirmDelete(item)}
                            >
                              <MdDelete style={{ width: 16, height: 16 }} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <th scope="col">Not found users</th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {pageCount > 0 && (
              <div className="table-footer-container">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
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
