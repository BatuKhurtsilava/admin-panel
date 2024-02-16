import React from "react";
import { ImTable } from "react-icons/im";
import { PiCards } from "react-icons/pi";
import { useState } from "react";
import UserOrResource from "./UserOrResource";
import { IoCreateOutline } from "react-icons/io5";
import useRequest from "../../../Hooks/useRequest";
import CreateEditPopup from "../../../Components/CreateEditPopup";
import { Link } from "react-router-dom";
import { CardListButton } from "./CardListButton";
import styled from "styled-components";
interface CardListProps {
  data: any[];
  section: string;
}
interface Icontainer {
  view: string;
}
const CardListContainer = styled.div<Icontainer>``;
const CardContainer = styled.div<Icontainer>``;

const CardList: React.FC<CardListProps> = ({ data, section }) => {
  const [view, setView] = useState("table");
  const [createSession, setCreateSession] = useState<boolean>(false);

  return (
    <div>
      <div>
        <CardListButton
          onClick={() => setView("table")}
          label={"table"}
          icon={ImTable}
        />
        <CardListButton
          onClick={() => setView("card")}
          label={"card"}
          icon={PiCards}
        />
        <CardListButton
          onClick={() => setCreateSession(true)}
          label={`New ${section}`}
          icon={IoCreateOutline}
        />
        {/* <button onClick={() => setView("table")}>
          <ImTable /> {"Table View"}
        </button>
        <button onClick={() => setView("card")}>
          <PiCards /> {"Card View"}
        </button>
        <button onClick={() => setCreateSession(true)}>
          <IoCreateOutline /> {`new ${section}`}
        </button> */}
      </div>
      <CardListContainer view={view}>
        {data.map((item) => (
          <CardContainer view={view} key={item.id}>
            <UserOrResource view={view} info={item} section={section} />
            <Link
              to={
                section === "resources"
                  ? `/admin/resource/${item.id}`
                  : `/admin/user/${item.id}`
              }
            >
              See details
            </Link>
          </CardContainer>
        ))}
      </CardListContainer>
      {createSession && (
        <CreateEditPopup
          createSession={createSession}
          setCreateSession={setCreateSession}
          section={section}
        />
      )}
    </div>
  );
};

export default CardList;
