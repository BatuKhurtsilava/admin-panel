import React from "react";
import { FaUsers } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useAuthorizationContext } from "../Contexts/AuthorizationContext";
import useRequest from "../Hooks/useRequest";
import styled from "styled-components";

const NavigationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 50px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  font-size: 30px;
  margin-left: 5px;
`;

const LinkItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  margin-bottom: 10px;
`;

const LogoutButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 300px;
  margin-right: 50px;
`;

const Navigation = () => {
  const { setLoggedin, loggedin } = useAuthorizationContext();
  const navigate = useNavigate();
  const { sendRequest } = useRequest();
  const handleLogout = () => {
    setLoggedin(false);
    navigate("admin/auth");
    localStorage.removeItem("token");
  };
  return (
    <NavigationContainer>
      {loggedin && (
        <LinksContainer>
          <LinkItem to={"admin/users"}>
            <FaUsers />
            Users
          </LinkItem>
          <LinkItem to={"admin/resources"}>
            <GrResources />
            Resources
          </LinkItem>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        </LinksContainer>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
