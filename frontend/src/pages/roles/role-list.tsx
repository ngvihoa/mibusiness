import { useEffect, useState } from "react";
import { ModalTextProps, RoleDBType } from "lib/type";
import { deleteRole, fetchAllRoles } from "services/roleService";
import axios from "axios";
import { handleError } from "lib/func";
import useAuth from "hooks/auth.hook";
import { toast } from "react-toastify";
import ModalConfirm from "components/modal/modal-confirm";
import PaginationBar from "components/pagination-bar/pagination-bar";
import usePagination from "hooks/pagination.hook";
import GeneralLayout from "components/layout/general-layout";
import { MdDelete, MdEdit } from "react-icons/md";
import { styleIcon, styleIconSm } from "lib/data";
import FillButton from "components/button/fill-button";
import LineButton from "components/button/line-button";
import { Table } from "react-bootstrap";
import { FaFilter } from "react-icons/fa6";

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

const RoleList = () => {
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
      setPageCount(data.data.totalPages);
      setRoleList(data.data.roles);
      // console.log(data.data.roles);
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
        toast.success(data.message);
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
    <>
      <GeneralLayout classContainer="role-list-container" name="Role List">
        <div className="search-bar form-group d-flex gap-2">
          <input
            type="text"
            placeholder="Search group user..."
            className="form-control"
          />
          <FillButton>Search</FillButton>
          <LineButton onClickFunction={() => {}}>
            <FaFilter style={styleIcon} />
          </LineButton>
        </div>
        <div className="table-container">
          <Table responsive="lg" className="">
            <thead>
              <tr>
                <th>#</th>
                <th>Method</th>
                <th>Role</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roleList && roleList.length > 0 ? (
                <>
                  {roleList.map((item, index) => (
                    <tr key={`role-${index}-${item.id}`}>
                      <td>{index + 1}</td>
                      <td>{item.method}</td>
                      <td>{item.url}</td>
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
                <div>Not found roles...</div>
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
    </>
  );
};

export default RoleList;
