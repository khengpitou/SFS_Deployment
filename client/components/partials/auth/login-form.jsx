import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";


const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();

  // const onSubmit = (data) => {
  //   const user = users.find(
  //     (user) => user.username === data.username && user.password === data.password
  //   );

  //   if (user) {
  //     dispatch(handleLogin(true));

  //     setTimeout(() => {
  //       router.push("/crm");
  //     }, 1500);
  //   } else {
  //     toast.error("Invalid credentials", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

const onSubmit = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        username: data.username,
        password: data.password,
      }
    );

    if (response.status === 200) {
      // Login successful
      dispatch(handleLogin(true));

      setTimeout(() => {
        router.push("/crm");
      }, 1500);
    } else {
      // Handle other response statuses if needed
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    // Handle error if request fails
    console.error("Login failed:", error);
    toast.error("Login failed. Please try again later.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};


  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textinput
        name="username"
        label="Username"
        defaultValue="admin01"
        type="text"
        register={register}
        error={errors?.username}
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        defaultValue="12345"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
