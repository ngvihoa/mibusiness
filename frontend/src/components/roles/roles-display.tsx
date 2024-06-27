import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ModalTextProps, RoleDBType } from "src/lib/type";
import { deleteRole, fetchAllRoles } from "src/services/roleService";
import axios from "axios";
import { handleError } from "src/lib/func";
import useAuth from "src/hooks/auth.hook";
import { toast } from "react-toastify";
import ModalConfirm from "src/components/users/modal-confirm";
import PaginationBar from "src/components/paginate-bar/pagination-bar";
import usePagination from "src/hooks/pagination.hook";
import "./roles.scss";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const RolesDisplay = () => {
  const { handleLogOut } = useAuth();
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [modalText, setModalText] = useState<ModalTextProps>(initModal);
  const [dataModal, setDataModal] = useState<RoleDBType | null>(null);

  const [roleList, setRoleList] = useState<RoleDBType[] | null>(null);

  const {
    itemsPerPage,
    handlePageClick,
    pageCount,
    setPageCount,
    currentPage,
  } = usePagination(6);

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
                <PaginationBar
                  handlePageClick={handlePageClick}
                  pageCount={pageCount}
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
