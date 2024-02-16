import React, { useState, useEffect, useRef } from "react";
import { Iinfo1 } from "../Pages/UsersResources/components/UserOrResource";
import { Iinfo2 } from "../Pages/UsersResources/components/UserOrResource";
import { useForm, SubmitHandler } from "react-hook-form";
import useRequest from "../Hooks/useRequest";
import URLs from "../URLs.json";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import InputField from "../Pages/UsersResources/components/InputField";
import styled from "styled-components";
// import { Image } from "cloudinary-react";

const PopupContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 30%;
  width: 500px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;
const ContentContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
`;

const BlurredBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 130vh;
  backdrop-filter: blur(10px);
  z-index: -1;
`;

interface CreateEditPopupProps {
  section: string;
  info?: Iinfo1 & Iinfo2;
  editSession?: boolean;
  setEditSession?: any;
  createSession?: boolean;
  setCreateSession?: any;
}

const CreateEditPopup: React.FC<CreateEditPopupProps> = ({
  section,
  info,
  editSession,
  setEditSession,
  setCreateSession,
  createSession,
}) => {
  const defaultValues =
    section === "users"
      ? {
          first_name: info?.first_name || "",
          last_name: info?.last_name || "",
          email: info?.email || "",
          avatar: info?.avatar || "",
        }
      : {
          name: info?.name || "",
          year: info?.year || "",
          color: info?.color || "",
          pantone_value: info?.pantone_value || "",
        };

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm({
      defaultValues: defaultValues as Record<string, any>,
    });
  const { errors } = formState;
  let validator = require("validator");
  const { sendRequest, loading, error, response, getData, setLoading } =
    useRequest();
  const [imageSelected, setImageSelected] = useState<string | Blob>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const onSubmit = async (data: any) => {
    const url = section === "users" ? URLs.Users : URLs.Resources;
    editSession
      ? sendRequest(`${url}/${info?.id}`, "PATCH", data)
      : sendRequest(`${url}/${info?.id}`, "POST", data);
  };

  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "fh0dbdaz");
    fetch("https://api.cloudinary.com/v1_1/dbpitaj87/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        setImageUrl(res.url);
      })
      .finally(() => setLoading(false));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (editSession) setEditSession(false);
      if (createSession) setCreateSession(false);
    }
  };

  useEffect(() => {
    if (editSession || createSession) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [editSession, createSession]);

  useEffect(() => {
    if (imageUrl !== "") {
      setValue("avatar", imageUrl);
      alert("image succesfully uploaded");
    }
  }, [imageUrl]);

  useEffect(() => {
    console.log(response);

    if (response) {
      if (editSession) {
        setEditSession(false);
        // toast.success(
        //   section === "users"
        //     ? "user edited successfully"
        //     : "resource edited successfully"
        // );
        alert(
          section === "users"
            ? "user edited succesfully"
            : "resource edited successfully"
        );
      } else {
        // toast.success(
        //   section === "users"
        //     ? "user added successfully"
        //     : "resource added successfully"
        // );
        setCreateSession(false);
        alert(
          section === "users"
            ? "user added succesfully"
            : "resource added successfully"
        );
      }
    }
  }, [response]);

  return (
    <PopupContainer>
      <BlurredBackground />
      {loading && <Loader />}
      {section === "users" && (
        <ContentContainer ref={modalRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label={"first Name"}
              name={"first_name"}
              register={register}
              errors={errors}
              required={true}
            />
            <InputField
              label={"last Name"}
              name={"last_name"}
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label={"email"}
              name={"email"}
              register={register}
              errors={errors}
              required={true}
              validate={(val) =>
                validator.isEmail(val) || "email doesn't exist"
              }
            />

            {/* <p>first name</p>
            <input
              type="text"
              defaultValue={info ? info.first_name : ""}
              {...register("first_name", {
                required: "field is required",
              })}
            />
            {errors.first_name && (
              <p>
                {typeof errors.first_name === "string" ? errors.first_name : ""}
              </p>
            )}

            <p>last name</p>
            <input
              type="text"
              defaultValue={info ? info.last_name : ""}
              {...register("last_name", {
                required: "field is required",
              })}
            />
            {errors.last_name && (
              <p>
                {typeof errors.last_name === "string" ? errors.last_name : ""}
              </p>
            )}
            <p>email</p>
            <input
              type="text"
              defaultValue={info ? info.email : ""}
              {...register("email", {
                required: "field is required",
                validate: (val) => {
                  if (!validator.isEmail(val)) return "email doesn't exist";
                },
              })}
            />
            {errors.email && (
              <p>{typeof errors.email === "string" ? errors.email : ""}</p>
            )} */}
          </form>
          <input
            type="file"
            onChange={(event) => {
              const file = event.target.files ? event.target.files[0] : null;
              if (file) {
                setImageSelected(file);
              }
            }}
          />
          <button onClick={uploadImage}>upload image</button>
          {/* <Image cloudName={"dbpitaj87"} publicId="" /> */}
          <button>submit</button>
        </ContentContainer>
      )}
      {section === "resources" && (
        <ContentContainer ref={modalRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label={"name"}
              name={"name"}
              register={register}
              errors={errors}
              required={true}
            />
            <InputField
              label={"year"}
              name={"year"}
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label={"color"}
              name={"color"}
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label={"pantone_value"}
              name={"pantone_value"}
              register={register}
              errors={errors}
              required={true}
            />

            {/* <p>name</p>
            <input
              type="text"
              defaultValue={info ? info.name : ""}
              {...register("name", {
                required: "field is required",
              })}
            />
            {errors.name && (
              <p>{typeof errors.name === "string" ? errors.name : ""}</p>
            )}
            <p>year</p>
            <input
              type="text"
              defaultValue={info ? info.year : ""}
              {...register("year", {
                required: "field is required",
              })}
            />
            {errors.year && (
              <p>{typeof errors.year === "string" ? errors.year : ""}</p>
            )}
            <p>color</p>
            <input
              type="text"
              defaultValue={info ? info.color : ""}
              {...register("color", {
                required: "field is required",
              })}
            />
            {errors.color && (
              <p>{typeof errors.color === "string" ? errors.color : ""}</p>
            )}
            <p>pantone_value</p>
            <input
              type="text"
              defaultValue={info ? info.pantone_value : ""}
              {...register("pantolone_value", {
                required: "field is required",
              })}
            />
            {errors.pantone_value && (
              <p>
                {typeof errors.pantone_value === "string"
                  ? errors.pantone_value
                  : ""}
              </p>
            )} */}

            <button>submit</button>
          </form>
        </ContentContainer>
      )}
    </PopupContainer>
  );
};

export default CreateEditPopup;
