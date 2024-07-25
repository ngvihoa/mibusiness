import axios from "axios";
import GeneralLayout from "components/layout/general-layout";
import useAuth from "hooks/auth.hook";
import { styleIconSm } from "lib/data";
import { handleError, YMD2DMY } from "lib/func";
import { ProjectDBGet } from "lib/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Stack } from "react-bootstrap";
import { FaClock, FaRegClock } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById } from "services/projectService";

const badgeColor = [
  { bg: "primary", text: "light" },
  { bg: "success", text: "light" },
  { bg: "danger", text: "light" },
  { bg: "warning", text: "dark" },
  { bg: "info", text: "light" },
  { bg: "dark", text: "light" },
];

const Project = () => {
  const { handleLogOut } = useAuth();
  const params = useParams();
  const [data, setData] = useState<ProjectDBGet | null>(null);
  const [tags, setTags] = useState([
    "Mobile",
    "Hardcode tag",
    "react",
    "1 star",
  ]);

  const getProjectData = async () => {
    try {
      let res = await getProjectById(Number(params.groupId));
      setData(res.data);
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
    getProjectData();
  }, []);

  return (
    <>
      {data && (
        <GeneralLayout
          name={data.name}
          classContainer="project-container container-lg"
          fluid
        >
          <Container fluid>
            <Row>
              <Col xs={12} md={{ order: 2, span: 3 }} className="p-2">
                <Stack>
                  <div className="section">
                    <div>About</div>
                    <p>{data.description}</p>
                    {tags && tags.length && (
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="tags flex-wrap"
                      >
                        {tags.map((tag, index) => (
                          <Badge key={`project-tag-${index}`}>{tag}</Badge>
                        ))}
                      </Stack>
                    )}
                    <Stack gap={1} className="more-info">
                      <Stack direction="horizontal" gap={1}>
                        <FaRegClock />
                        <span>
                          {YMD2DMY(data.startDate)} -{" "}
                          {data.endDate ? (
                            YMD2DMY(data.endDate)
                          ) : (
                            <i>In progress</i>
                          )}
                        </span>
                      </Stack>
                    </Stack>
                  </div>
                  <hr />
                  <div className="section">
                    <div>Owner</div>
                    <div>{data.User?.username ?? "No owner"}</div>
                  </div>
                  <br />
                  <div className="section">
                    <div>Team member</div>
                    <div>{data.User?.username ?? "No member"}</div>
                  </div>
                </Stack>
              </Col>
              <Col xs md={{ order: 1, span: 9 }} className="p-2">
                future data
              </Col>
            </Row>
          </Container>
        </GeneralLayout>
      )}
      {!data && <div>project not found...</div>}
    </>
  );
};

export default Project;
