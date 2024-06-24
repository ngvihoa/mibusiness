import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import "./roles.scss";
import { ModalTextProps, RoleDBType } from "src/lib/type";
import { deleteRole, fetchAllRoles } from "src/services/roleService";
import axios from "axios";
import { handleError } from "src/lib/func";
import useAuth from "src/hooks/auth.hook";
import { toast } from "react-toastify";
import ModalConfirm from "src/components/users/modal-confirm";

const mock: RoleDBType[] = [
  {
    id: 1,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 2,
    url: "/user/read",
    description: "",
  },
  {
    id: 3,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
];

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const RolesDisplay = () => {
  const { handleLogOut } = useAuth();
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [modalText, setModalText] = useState<ModalTextProps>(initModal);
  const [dataModal, setDataModal] = useState<RoleDBType | null>(null);

  const [roleList, setRoleList] = useState<RoleDBType[] | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
  };

  const fetchRoles = async () => {
    try {
      let data = await fetchAllRoles(currentPage, itemsPerPage);
      setPageCount(data.DT.totalPages);
      setRoleList(data.DT.roles);
      // console.log(data.DT.roles);
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

  const handleCloseModalConfirmDelete = () => {
    setDataModal(null);
    setShowModalConfirmDelete(false);
  };
  const handleShowModalConfirmDelete = (role: RoleDBType) => {
    setModalText({
      headingText: "Delete role",
      bodyText:
        "Do you really want to delete role: " +
        role.id +
        " - " +
        role.url +
        "?",
    });
    setDataModal(role);
    setShowModalConfirmDelete(true);
  };
  const handleConfirmDelete = async () => {
    try {
      if (dataModal) {
        let data = await deleteRole(dataModal);
        toast.success(data.EM);
        await fetchRoles();
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

  useEffect(() => {
    fetchRoles();
  }, [currentPage]);

  return (
    <div className="role-display-container">
      <div className="container">
        <h3 className="role-title">Role list</h3>
        {roleList && (
          <>
            <div className="role-parent">
              {roleList.map((item, index) => (
                <div className="role-child" key={item.id + "-" + index}>
                  <p>{item.url}</p>
                  <p>Id: {item.id}</p>
                  <p>
                    {!item.description || item.description === ""
                      ? "No description"
                      : item.description}
                  </p>
                  <div
                    className="btn btn-danger"
                    onClick={() => handleShowModalConfirmDelete(item)}
                  >
                    <MdDelete style={{ width: 14, height: 14 }} />
                  </div>
                </div>
              ))}
            </div>
            {pageCount > 0 && (
              <div className="pagination-container">
                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="<"
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
          </>
        )}
        {!roleList && <div>Data not found</div>}
      </div>
      <ModalConfirm
        show={showModalConfirmDelete}
        text={modalText}
        handleClose={handleCloseModalConfirmDelete}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RolesDisplay;
