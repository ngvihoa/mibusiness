import { useEffect, useState } from "react";
import { deleteUser, fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalConfirm from "./modal-confirm";
import { ModalTextProps, UsersType } from "../../lib/type";
import ModalUser from "./modal-user";
import "./users.scss";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const Users = () => {
  // confirm delete user states
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [modalText, setModalText] = useState<ModalTextProps>(initModal);

  const [dataModal, setDataModal] = useState<UsersType | null>(null);
  // pagination states
  const [userList, setUserList] = useState<UsersType[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    let { data } = await fetchAllUsers(currentPage, itemsPerPage);
    if (data && +data.EC === 0) {
      setPageCount(data.DT.totalPages);
      setUserList(data.DT.users);
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
    if (dataModal) {
      let { data } = await deleteUser(+dataModal.id);
      if (data && +data.EC === 0) {
        toast.success(data.EM);
        await fetchUsers();
      } else {
        toast.error(data.EM);
      }
      handleCloseModalConfirmDelete();
    }
  };

  // function for create/edit user
  const handleCloseModalCreateUser = () => {
    setDataModal(null);
    setShowModalCreateUser(false);
  };
  const handleShowModalCreateUser = (user: UsersType | null) => {
    setModalText({
      headingText: "Create a new user",
      bodyText: "",
    });
    if (user) setDataModal(user);
    setShowModalCreateUser(true);
  };
  const handleCreateUser = () => {
    console.log("create user ha :D");
  };

  // fetching on mount
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <>
      <div className="manage-users-container container-fluid px-4 mx-0 container-md mx-md-auto">
        <div className="row">
          {/* <div className="user-info-form col-6 mt-4 p-0 shadow-sm rounded-3 border">
          <div
            className="bg-primary py-2 px-3 rounded-3 text-white"
            data-bs-toggle="collapse"
            data-bs-target="#collapseBox"
            aria-expanded="false"
            aria-controls="collapseBox"
          >
            <h3>Create new user</h3>
          </div>
          <form
            className="rounded-bottom-3 mb-0 collapse"
            id="collapseBox"
            method="post"
            action="/users/create-user"
          >
            <div className="row p-3">
              <div className="form-group mb-3 col-12">
                <label htmlFor="email" className="fw-medium">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="username" className="fw-medium">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  required
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="password" className="fw-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary fw-medium">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div> */}

          <div className="table-user-info mt-3 p-0">
            <div className="row d-flex flex-row justify-content-between align-items-center mb-3">
              <h3 className="col m-0">Table users</h3>
              <div className="actions col text-end">
                <button className="btn btn-success">Refresh</button>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => handleShowModalCreateUser(null)}
                >
                  Add new user
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
                          <td>{index}</td>
                          <td>{item.id}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.sex ? item.sex : "NULL"}</td>
                          <td>
                            {item.Group ? item.Group.description : "NULL"}
                          </td>
                          <td>
                            <button className="btn btn-warning fw-medium me-2">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger fw-medium"
                              onClick={() => handleShowModalConfirmDelete(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td scope="col">Not found users</td>
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
        show={showModalCreateUser}
        text={modalText}
        handleClose={handleCloseModalCreateUser}
        handleConfirm={handleCreateUser}
      />
    </>
  );
};

export default Users;
