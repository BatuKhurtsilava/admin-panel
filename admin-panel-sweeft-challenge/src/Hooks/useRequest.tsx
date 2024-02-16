import React, { useState } from "react";
import { Iinfo1 } from "../Pages/UsersResources/components/UserOrResource";
import { Iinfo2 } from "../Pages/UsersResources/components/UserOrResource";
import { toast } from "react-hot-toast";

interface Iresponse1 {
  token: string;
}
interface Iresponse2 {
  total_pages: number;
  data: [] & Iinfo1 & Iinfo2;
}
const useRequest = () => {
  const [response, setResponse] = useState<
    (Iresponse1 & Iresponse2 & string) | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const getData = (url: string) => {
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get response");
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data);
      })

      .catch((err) => {
        console.error(err);
        // toast.error(err);
      })
      .finally(() => setLoading(false));
  };
  const sendRequest = (url: string, method: string, body?: object) => {
    setError(undefined);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: method === "DELETE" ? null : JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get response");
        }

        if (res.status === 204) {
          return "item deleted";
        }

        return res.json();
      })
      .then((data) => {
        setResponse(data);
      })

      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  return {
    response,
    getData,
    sendRequest,
    loading,
    error,
    setError,
    setLoading,
  };
};

export default useRequest;
