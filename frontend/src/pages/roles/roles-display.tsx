import { useEffect, useState } from "react";
import { ModalTextProps, RoleDBType } from "lib/type";
import { deleteRole, fetchAllRoles } from "services/roleService";
import axios from "axios";
import { handleError } from "lib/func";
import useAuth from "hooks/auth.hook";
import { toast } from "react-toastify";
import ModalConfirm from "components/modal-confirm/modal-confirm";
import PaginationBar from "components/paginate-bar/pagination-bar";
import usePagination from "hooks/pagination.hook";
import RoleCard from "./role-card";

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
      <div className="content-container">
        <h3 className="role-title">Role list</h3>
        {roleList && (
          <>
            <div className="role-parent">
              {roleList.map((item, index) => (
                <RoleCard
                  key={item.id + "-" + index}
                  role={item}
                  openModalConfirm={handleShowModalConfirmDelete}
                />
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
