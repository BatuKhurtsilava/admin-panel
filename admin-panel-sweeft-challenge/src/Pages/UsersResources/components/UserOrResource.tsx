import React, { useEffect, useState, ComponentType } from "react";
import useRequest from "../../../Hooks/useRequest";
import CreateEditPopup from "../../../Components/CreateEditPopup";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import URLs from "../../../URLs.json";
import { toast } from "react-hot-toast";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface CardContainerProps {
  isIndividualPage: boolean;
  view?: string;
}

interface InfoContainerProps {
  isIndividualPage: boolean;
  view?: string;
}

const CardContainer = styled.div<CardContainerProps>`
  background-color: ${({ isIndividualPage }) =>
    isIndividualPage ? "#f0f0f0" : "#e0e0e0"};
`;

const InfoContainer = styled.div<InfoContainerProps>`
  margin-left: ${({ isIndividualPage }) => (isIndividualPage ? "0" : "10px")};

  & p {
    display: max-content;
    justify-content: center;
  }
  .table {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 150px;
    height: 150px;
  }
  .card {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
`;
const Avatar = styled.img<InfoContainerProps>`
  height: ${({ isIndividualPage }) => (isIndividualPage ? "300px" : "100px")};
  width: ${({ isIndividualPage }) => (isIndividualPage ? "300" : "100px")};
  border-radius: 50%;
  margin-right: ${({ isIndividualPage }) => (isIndividualPage ? "0" : "10px")};
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
`;

export interface ICardProps {
  section: string;
  info: Iinfo1 & Iinfo2;
  view?: string;
}
export interface Iinfo1 {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
export interface Iinfo2 {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
const UserOrResource: React.FC<ICardProps> = ({ view, section, info }) => {
  const { sendRequest, loading, response } = useRequest();
  const [editSession, setEditSession] = useState(false);
  const location = useLocation();
  const param = useParams();
  const isIndividualPage = param.userId || param.resId ? true : false;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      sendRequest(`${URLs.Users}/${info.id}`, "DELETE");
    }
  };
  useEffect(() => {
    if (response === "item deleted")
      // toast.success("user deleted successfully");
      window.history.back();
  }, [response]);

  useEffect(() => {
    console.log(view);
  }, [view]);
  return (
    <CardContainer isIndividualPage={isIndividualPage}>
      {loading && <Loader />}
      {section === "users" && (
        <div>
          <InfoContainer isIndividualPage={isIndividualPage}>
            <div className={view === "table" ? "table" : "card"}>
              <Avatar
                src={info.avatar}
                alt="avatarPhoto"
                isIndividualPage={isIndividualPage}
              />
              <p>
                {view === "card" ? "id:" : ""} {info.id}
              </p>
              <p>
                {view === "card" ? "name:" : ""} {info.first_name}
              </p>
              <p>
                {view === "card" ? "surname:" : ""} {info.last_name}
              </p>
              <p>
                {view === "card" ? "email:" : ""} {info.email}
              </p>
            </div>
          </InfoContainer>
          {isIndividualPage && (
            <ButtonContainer>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={() => setEditSession(true)}>Edit</Button>
            </ButtonContainer>
          )}
        </div>
      )}
      {section === "resources" && (
        <InfoContainer isIndividualPage={isIndividualPage}>
          <div className={view === "table" ? "table" : "card"}>
            <p>
              {view === "card" ? "id:" : ""}
              {info.id}
            </p>
            <p>
              {view === "card" ? "name:" : ""}
              {info.name}
            </p>
            <p>
              {view === "card" ? "year:" : ""}
              {info.year}
            </p>
            <p>
              {view === "card" ? "color:" : ""}
              {info.color}
            </p>
            <p>
              {view === "card" ? "pantone value:" : ""}
              {info.pantone_value}
            </p>
            {isIndividualPage && (
              <ButtonContainer>
                <Button onClick={() => setEditSession(true)}>Edit</Button>
              </ButtonContainer>
            )}
          </div>
        </InfoContainer>
      )}
      {editSession && (
        <CreateEditPopup
          editSession={editSession}
          section={section}
          info={info}
          setEditSession={setEditSession}
        />
      )}
    </CardContainer>
  );
};

export default UserOrResource;
