import React from "react";
import useRequest from "../../Hooks/useRequest";
import URLs from "../../URLs.json";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import CardList from "./components/CardList";
import Pagination from "../../Components/Pagination";

const ResourcesOrUsers = () => {
  const { getData, response } = useRequest();
  const location = useLocation();
  const { pathname } = location;
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState<number | undefined>();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  useEffect(() => {
    getData(
      `${
        pathname.includes("/resources") ? URLs.Resources : URLs.Users
      }?page=${searchParams.get("page")}&per_page=${itemsPerPage}`
    );
  }, [pathname, searchParams.get("page")]);

  useEffect(() => {
    if (response?.total_pages) setPageCount(response?.total_pages);
  }, [response]);

  return (
    <div>
      {response?.data && (
        <div>
          <CardList
            data={response?.data}
            section={pathname.includes("/resources") ? "resources" : "users"}
          />
          <Pagination prevPage={prevPage} nextPage={nextPage} />
        </div>
      )}
    </div>
  );
};

export default ResourcesOrUsers;
