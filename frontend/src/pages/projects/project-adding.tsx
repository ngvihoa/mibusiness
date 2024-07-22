import axios from "axios";
import GeneralLayout from "components/layout/general-layout";
import useAuth from "hooks/auth.hook";
import { handleError } from "lib/func";
import { UsersType } from "lib/type";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchAllUsers } from "services/userService";

const ProjectAdding = () => {
  const { handleLogOut } = useAuth();
  const [userList, setUserList] = useState<UsersType[] | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      let data = await fetchAllUsers(1, 10);
      setUserList(data.data.users);
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

  const handleChangeSelect = (id: string) => {
    if (id === "") setCustomerId(null);
    else setCustomerId(parseInt(id));
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
        <form>
          <div className="form-group">
            <label htmlFor="project-name">Project name</label>
            <input
              type="text"
              name="project-name"
              placeholder="Enter project name..."
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="project-description">Project description</label>
            <input
              type="text"
              name="project-description"
              placeholder="Enter project name..."
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="project-start">Start date</label>
            <input
              type="date"
              name="project-start"
              placeholder={String(new Date().toISOString())}
              className="form-control"
            />
          </div>
          <div className="select-container">
            <label htmlFor="group">
              Customer (<i>*</i>):
            </label>
            <Form.Select
              name="group"
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              <option value="">Choose a group...</option>
              {userList?.map((item, index) => (
                <option key={index + "-" + item.id} value={item.id}>
                  {item.username}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* missing feature to assign employee to project 
            // ...
          */}
        </form>
      </GeneralLayout>
    </>
  );
};

export default ProjectAdding;
