import axios from "axios";
import FillButton from "components/button/fill-button";
import GeneralLayout from "components/layout/general-layout";
import useAuth from "hooks/auth.hook";
import { handleError } from "lib/func";
import { UsersType } from "lib/type";
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchAllUsers, getUsersByGroup } from "services/userService";

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
  const [userList, setUserList] = useState<UsersByGroup[] | null>(null);
  // const [customerId, setCustomerId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectAddingForm>(initalForm);

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
              className="form-control"
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
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="select-container">
            <label htmlFor="customerId">Customer:</label>
            <Form.Select name="customerId" onChange={(e) => handleOnChange(e)}>
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
