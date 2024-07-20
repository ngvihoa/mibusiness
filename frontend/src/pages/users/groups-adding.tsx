import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { GroupPostType } from "lib/type";
import axios from "axios";
import { handleError } from "lib/func";
import useAuth from "hooks/auth.hook";
import FillButton from "components/button/fill-button";
import { createGroups } from "services/groupService";
import GeneralLayout from "components/layout/general-layout";

interface GroupListType {
  [key: string]: any;
}

const initialGroupList: GroupListType = {
  group1: {
    name: "",
    description: "",
    isValid: true,
  },
};

const GroupsAdding = () => {
  const { handleLogOut } = useAuth();
  const [groupList, setGroupList] = useState(initialGroupList);

  const onChangeRole = (key: string, e: any) => {
    const tmpList = { ...groupList };
    tmpList[key][e.target.name] = e.target.value;
    if (tmpList[key].name === "" && tmpList[key].isValid) {
      tmpList[key].isValid = false;
    } else if (tmpList[key].name !== "" && !tmpList[key].isValid) {
      tmpList[key].isValid = true;
    }
    setGroupList(tmpList);
  };

  const onAddInput = () => {
    const tmpList = { ...groupList };
    const newIndex = uuid();
    tmpList[`child-${newIndex}`] = {
      name: "",
      description: "",
      isValid: true,
    };
    setGroupList(tmpList);
  };

  const onDeleteGroup = (key: string) => {
    const tmpList = { ...groupList };
    if (delete tmpList[key]) {
      setGroupList(tmpList);
    }
  };

  const handleValidateGroup = () => {
    const tmpValid = { ...groupList };
    let re = true;
    console.log(tmpValid);
    for (const key in groupList) {
      if (groupList[key].name === "") {
        tmpValid[key].isValid = false;
        re = false;
      } else if (groupList[key].name !== "" && !tmpValid[key].isValid) {
        tmpValid[key].isValid = true;
      }
    }
    setGroupList(tmpValid);

    if (!re) toast.error("Please enter all name fields!");
    return re;
  };

  const buildDatatoPersist = (): GroupPostType[] => {
    const tmpList = { ...groupList };
    const dataToPersist: GroupPostType[] = [];
    for (const key in tmpList) {
      dataToPersist.push({
        name: tmpList[key].name,
        description: tmpList[key].description,
      });
    }

    return dataToPersist;
  };

  const onSubmit = async () => {
    const check = handleValidateGroup();
    if (!check) return;
    const groups = buildDatatoPersist();
    try {
      let data = await createGroups(groups);
      toast.success(data.EM);
      setGroupList({
        group1: {
          name: "",
          description: "",
          isValid: true,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        } else if (status === 400) {
          toast.error(error.response?.data.EM || "Bad Request");
        }
      }
    }
  };

  return (
    <GeneralLayout
      classContainer="group-adding-container"
      name="Add New Groups"
    >
      <div className="group-parent">
        {Object.entries(groupList).map(([key, value], index) => {
          return (
            <div className="group-child" key={key}>
              <div className="group-input form-group">
                <label htmlFor="url">Url:</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    !value.isValid ? "is-invalid" : ""
                  }`}
                  placeholder="Example: BA..."
                  value={value.name}
                  onChange={(e) => onChangeRole(key, e)}
                />
              </div>
              <div className="group-input form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Example: Business Analyst..."
                  value={value.description}
                  onChange={(e) => onChangeRole(key, e)}
                />
              </div>
              <div className="group-input">
                {Object.entries(groupList).length - 1 === index && (
                  <FillButton onClickFunction={onAddInput}>
                    <FiPlusCircle />
                  </FillButton>
                )}
                {Object.entries(groupList).length > 1 && (
                  <FillButton onClickFunction={() => onDeleteGroup(key)}>
                    <MdDelete />
                  </FillButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="group-bottom">
        <FillButton onClickFunction={onSubmit}>Save new groups</FillButton>
      </div>
    </GeneralLayout>
  );
};

export default GroupsAdding;
