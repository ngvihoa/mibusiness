import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";

interface GroupType {
  name: string;
  description: string;
}

interface UsersType {
  id: string;
  email: string;
  username: string;
  phone: string;
  sex: string;
  Group: GroupType | null;
}

const Users = () => {
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

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="manage-users-container container">
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
              <button className="btn btn-primary ms-1">Add new user</button>
            </div>
          </div>
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
                      <td>{item.Group ? item.Group.description : "NULL"}</td>
                      <td>
                        <button className="btn btn-warning fw-medium me-2">
                          Edit
                        </button>
                        <button className="btn btn-danger fw-medium">
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
  );
};

export default Users;
