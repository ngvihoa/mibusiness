import axios from "axios";
import FillButton from "components/button/fill-button";
import LineButton from "components/button/line-button";
import GeneralLayout from "components/layout/general-layout";
import PaginationBar from "components/pagination-bar/pagination-bar";
import useAuth from "hooks/auth.hook";
import usePagination from "hooks/pagination.hook";
import { styleIcon } from "lib/data";
import { handleError, YMD2DMY } from "lib/func";
import { ProjectDBGet } from "lib/interfaces/project.interface";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getProjects } from "services/projectService";

const ProjectList = () => {
  const { handleLogOut } = useAuth();
  // confirm delete user states
  const [projectList, setProjectList] = useState<ProjectDBGet[] | null>(null);

  const {
    pageCount,
    setPageCount,
    currentPage,
    itemsPerPage,
    handlePageClick,
  } = usePagination(10);

  const fetchProjects = async () => {
    try {
      let response = await getProjects(currentPage, itemsPerPage);
      setPageCount(response.data.totalPages);
      setProjectList(response.data.projects);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        }
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <GeneralLayout classContainer="project-list-container" name="Project List">
      <div className="search-bar form-group d-flex gap-2">
        <input
          type="text"
          placeholder="Search project..."
          className="form-control"
        />
        <FillButton>Search</FillButton>
        <LineButton onClickFunction={() => {}} className="d-block d-lg-none">
          <FaFilter style={styleIcon} />
        </LineButton>
      </div>
      <div className="row mt-4">
        <div className="filter-container col-12 col-lg-4 pt-2 mb-3">
          <div
            className="filter-box d-flex flex-column gap-3 bg-light p-3 rounded-3
          shadow-sm w-100"
          >
            <div className="filter-item">
              <label>Filter by time</label>
              <div className="d-flex gap-4 align-items-center">
                <input
                  type="date"
                  name="fromDate"
                  id=""
                  className="form-control"
                />{" "}
                to{" "}
                <input
                  type="date"
                  name="endDate"
                  id=""
                  className="form-control"
                />
              </div>
            </div>
            <div className="filter-item">
              <label>Filter by owner</label>
              <div className="d-flex gap-2 justify-content-evenly">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="owner-filter"
                    id="all"
                  />
                  <label className="form-check-label" htmlFor="all">
                    All
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="owner-filter"
                    id="owner"
                  />
                  <label className="form-check-label" htmlFor="owner">
                    Has owner
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="owner-filter"
                    id="none-owner"
                  />
                  <label className="form-check-label" htmlFor="none-owner">
                    No owner
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-item">
              <label>Filter something</label>
              <p>See future...</p>
            </div>
          </div>
        </div>
        <div className="projects-list-container col-12 col-lg-8">
          <div className="projects-list mb-4">
            {projectList &&
              projectList.length &&
              projectList.map((project, index) => {
                return (
                  <div
                    key={`project-${project.id}-${index}`}
                    className={`project-item w-100 border-bottom p-2 pb-3`}
                  >
                    <div className="w-100 mt-2 d-flex justify-content-between gap-2">
                      <span className=" fw-semibold">
                        <Link to={`/projects/${project.id}`}>
                          {project.name}
                        </Link>
                      </span>
                      <span>
                        {YMD2DMY(project.startDate)} -{" "}
                        {project.endDate ?? "On going"}
                      </span>
                    </div>
                    <div className="description">
                      {project.description ?? "No description"}
                    </div>
                    <div>
                      Owner: {project.User ? project.User.username : "None"}
                    </div>
                  </div>
                );
              })}
            {(!projectList || !projectList.length) && (
              <div>No project founded...</div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <PaginationBar
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default ProjectList;
