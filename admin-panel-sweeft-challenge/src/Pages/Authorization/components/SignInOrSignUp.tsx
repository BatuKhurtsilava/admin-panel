import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthorizationContext } from "../../../Contexts/AuthorizationContext";
import useRequest from "../../../Hooks/useRequest";
import URLs from "../../../URLs.json";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";
import InputField from "../../UsersResources/components/InputField";
import {
  ErrorMessage,
  Input,
  Button,
  SignInButton,
  SignUpButton,
  FormContainer,
} from "../styles/styles";

export interface EditI {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  confirmPassword?: string;
}

const SignInOrSignUp = () => {
  const [authorization, setAuthorization] = useState("login");
  const { loggedin, setLoggedin } = useAuthorizationContext();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { loading, sendRequest, response, error, setError } = useRequest();
  const navigate = useNavigate();

  const editValues: EditI =
    authorization === "login"
      ? {
          email: "",
          password: "",
        }
      : {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;
  let validator = require("validator");

  const containsSymbol = (password: string) => {
    const symbolRegex = /[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/;
    return symbolRegex.test(password);
  };

  const onSubmit = async (data: EditI) => {
    if (authorization === "login") {
      sendRequest(URLs.Login, "POST", data);
    } else {
      sendRequest(URLs.SignUp, "POST", data);
    }
    console.log(data);
  };

  useEffect(() => {
    if (authorization === "signUp" && response?.token) {
      setAuthorization("login");
      reset();
    }

    if (authorization === "login" && response?.token) {
      localStorage.setItem("token", JSON.stringify(response.token));
      setLoggedin(true);
    }
  }, [response]);

  useEffect(() => {
    if (loggedin) navigate("/admin/main");
  }, [loggedin]);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  return (
    <FormContainer>
      {loading && <Loader />}
      {authorization === "login" && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="email"
              defaultValue={editValues.email}
              {...register("email", {
                required: "field is required",
                validate: (val) => {
                  if (!validator.isEmail(val)) return "email doesn't exist";
                },
              })}
            />
            <Input
              type="password"
              placeholder="password"
              defaultValue={editValues.password}
              {...register("password", {
                required: "field is required",
              })}
            />

            <SignInButton>Sign in</SignInButton>
            {error && (
              <ErrorMessage>Email or password is incorect</ErrorMessage>
            )}
          </form>

          <p>Not registered?</p>
          <SignUpButton
            onClick={() => {
              setAuthorization("signUp");
              setError(undefined);
              reset();
            }}
          >
            Sign up
          </SignUpButton>
        </div>
      )}
      {authorization === "signUp" && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="name"
              defaultValue={editValues.first_name}
              {...register("first_name", {
                required: "field is required",
              })}
            />
            {errors.first_name?.message &&
              errors.first_name.type !== "required" && (
                <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
              )}
            <Input
              type="text"
              placeholder="surname"
              defaultValue={editValues.last_name}
              {...register("last_name", {
                required: "field is required",
              })}
            />
            {errors.last_name?.message &&
              errors.last_name.type !== "required" && (
                <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
              )}
            <Input
              type="text"
              placeholder="email"
              defaultValue={editValues.email}
              {...register("email", {
                required: "field is required",
                validate: (val) => {
                  if (!validator.isEmail(val)) return "email doesn't exist";
                },
              })}
            />
            {errors.email?.message && errors.email.type !== "required" && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
            <Input
              type="password"
              placeholder="password"
              defaultValue={editValues.password}
              {...register("password", {
                required: "field is required",
                minLength: {
                  value: 6,
                  message: "minimum length of password: 6 characters ",
                },
                validate: (val) => {
                  if (!containsSymbol(val!)) {
                    return "password should contain symbols";
                  }
                },
              })}
            />
            {errors.password?.message &&
              errors.password.type !== "required" && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            <Input
              type="password"
              placeholder="confirm password"
              defaultValue={editValues.confirmPassword}
              {...register("confirmPassword", {
                required: "field is required",
                validate: (val) => {
                  if (val !== getValues("password"))
                    return "please confirm password correctly";
                },
              })}
            />
            {errors.confirmPassword?.message &&
              errors.confirmPassword.type !== "required" && (
                <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
              )}
            <SignUpButton>Sign up</SignUpButton>
          </form>
          {error && <ErrorMessage>Registration unsuccessful</ErrorMessage>}
          <p>Already registered?</p>
          <SignInButton
            onClick={() => {
              setAuthorization("login");
              reset();
              setError(undefined);
            }}
          >
            Sign in
          </SignInButton>
        </div>
      )}
    </FormContainer>
  );
};

export default SignInOrSignUp;

{
  /* <InputField
              defaultValue={editValues.email}
              placeholder={"Email"}
              register={register}
              name={"email"}
              validate={(val) =>
                validator.isEmail(val) || "email doesn't exist"
              }
              required={true}
              errors={errors}
            />
            <InputField
              defaultValue={editValues.password}
              placeholder={"Password"}
              register={register}
              name={"password"}
              type={"password"}
              validate={(val) =>
                validator.isEmail(val) || "email doesn't exist"
              }
              required={true}
              errors={errors}
            /> */
}

{
  /* <InputField
              defaultValue={editValues.first_name}
              placeholder={"first name"}
              register={register}
              name={"first_name"}
              required={true}
              errors={errors}
            />
            <InputField
              defaultValue={editValues.last_name}
              placeholder={"last name"}
              register={register}
              name={"last_name"}
              required={true}
              errors={errors}
            />
            <InputField
              defaultValue={editValues.email}
              placeholder={"email"}
              register={register}
              name={"email"}
              required={true}
              errors={errors}
              validate={(val) =>
                validator.isEmail(val) || "email doesn't exist"
              }
            />
            <InputField
              defaultValue={editValues.password}
              placeholder={"password"}
              register={register}
              name={"password"}
              required={true}
              errors={errors}
              minLength={6}
              validate={(val) =>
                containsSymbol(val) || "password should contain symbols"
              }
            />
            <InputField
              defaultValue={editValues.confirmPassword}
              placeholder={"confirm password"}
              register={register}
              type={"confirmPassword"}
              name={"confirmPassword"}
              required={true}
              errors={errors}
              minLength={6}
              validate={(val) => {
                return (
                  val === getValues("password") ||
                  "please confirm password correctly"
                );
              }}
            /> */
}
