import axios from "axios";
import FillButton from "components/button/fill-button";
import GeneralLayout from "components/layout/general-layout";
import useAuth from "hooks/auth.hook";
import { handleError } from "lib/func";
import { ProjectPostType } from "lib/interfaces/project.interface";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject } from "services/projectService";
import { getUsersByGroup } from "services/userService";

interface UsersByGroup {
  id: number;
  username: string;
}

interface ProjectAddingForm {
  name: string;
  description: string;
  startDate: string;
  customerId: string;
}

const initalForm: ProjectAddingForm = {
  name: "",
  description: "",
  startDate: "",
  customerId: "",
};

const ProjectAdding = () => {
  const { handleLogOut } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UsersByGroup[] | null>(null);
  const [form, setForm] = useState<ProjectAddingForm>(initalForm);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      let response = await getUsersByGroup(4);
      setUserList(response.data);
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

  const handleOnChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    if (!form.name) {
      toast.error("Project's name cannot be empty!");
      setError(true);
      return;
    }
    try {
      const newProject: ProjectPostType = {
        name: form.name,
        description: form.description ?? null,
        startDate: !form.startDate
          ? new Date().toISOString().slice(0, 10)
          : form.startDate,
        endDate: null,
        customerId:
          isNaN(Number(form.customerId)) || Number(form.customerId) < 1
            ? null
            : Number(form.customerId),
      };
      let res = await createProject(newProject);
      toast.success(res.message);
      setForm(initalForm);
      navigate(`/projects/${res.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        } else if (status === 400) {
          toast.error(error.response?.data.message);
          setError(true);
        }
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <GeneralLayout
        name="Add New Project"
        classContainer="project-adding-container"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Project name (<i className="text-danger">*</i>):
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter project name..."
              className={`form-control ${error ? "is-invalid" : ""}`}
              value={form.name}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Project description:</label>
            <input
              type="text"
              name="description"
              placeholder="Enter project name..."
              className="form-control"
              value={form.description}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={form.startDate}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="select-container">
            <label htmlFor="customerId">Customer:</label>
            <Form.Select
              name="customerId"
              value={form.customerId}
              onChange={(e) => handleOnChange(e)}
            >
              <option value="">Choose a group...</option>
              {userList?.map((item, index) => (
                <option key={index + "-" + item.id} value={item.id}>
                  {item.username}
                </option>
              ))}
            </Form.Select>
          </div>
          <FillButton>Add Project</FillButton>
          {/* missing feature to assign employee to project 
            // ...
          */}
        </form>
      </GeneralLayout>
    </>
  );
};

export default ProjectAdding;
