import FillButton from "components/button/fill-button";
import LineButton from "components/button/line-button";
import PaginationBar from "components/paginate-bar/pagination-bar";
import { styleIcon, styleIconSm } from "lib/data";
import React from "react";
import { FaFilter } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: null,
    customerId: null,
  },
  {
    id: 2,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 3,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 4,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 5,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 6,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 7,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 8,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 9,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
  {
    id: 10,
    name: "PakiSlot",
    descripton: "Develop a parking lot management system",
    startDate: "10/2023",
    endDate: "05/2024",
    customerId: null,
  },
];

const Projects = () => {
  return (
    <div className="projects-container container mt-20">
      <h3>Project Management</h3>
      <div className="search-bar form-group d-flex gap-2">
        <input
          type="text"
          placeholder="Search project..."
          className="form-control"
        />
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
              <h6>Filter by time</h6>
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
              <h6>Filter by owner</h6>
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
              <h6>Filter something</h6>
              <p>See future...</p>
            </div>
          </div>
        </div>
        <div className="projects-list-container col-12 col-lg-8">
          <div className="projects-list mb-4">
            {projects.map((project, index) => {
              return (
                <div
                  key={`project-${project.id}-${index}`}
                  className={`project-item w-100 border-bottom p-2 pb-3`}
                >
                  <div className="fw-semibold">
                    <Link to="#">{project.name}</Link>
                  </div>
                  <div className="w-100 mt-2 d-flex justify-content-between">
                    <span>{project.descripton}</span>
                    <span>
                      {project.startDate} - {project.endDate ?? "Current"}
                    </span>
                  </div>
                  <div>Owner: {project.customerId ?? "None"}</div>
                  <div className="custom-button">
                    <FillButton
                      className="fw-medium"
                      onClickFunction={() => {}}
                    >
                      <MdDelete style={styleIconSm} />
                    </FillButton>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center">
            <PaginationBar handlePageClick={() => {}} pageCount={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
