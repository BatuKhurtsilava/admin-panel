import React, { useEffect } from "react";
import UserOrResource from "./components/UserOrResource";
import { useLocation } from "react-router-dom";
import useRequest from "../../Hooks/useRequest";
import URLs from "../../URLs.json";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";

const CardPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const { getData, response, loading } = useRequest();
  const param = useParams();

  useEffect(() => {
    pathname.includes("/resource")
      ? getData(`${URLs.Resources}/${param.resId}`)
      : getData(`${URLs.Users}/${param.userId}`);
  }, [pathname]);

  const section = param.userId ? "users" : "resources";
  useEffect(() => {
    console.log(param);

    console.log(response);
  }, [response]);

  return (
    <div>
      {loading && <Loader />}
      {response && <UserOrResource info={response.data} section={section} />}
    </div>
  );
};

export default CardPage;
