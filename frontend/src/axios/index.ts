/* eslint-disable consistent-return */
import { store } from "@/store";
import axios from "./interceptor";

//  Get Call
const Get: any = async (
  route: any,
  showAlert = true,
  withCredentials = false
) => {
  const accessToken = store.getState()?.auth?.token;
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: withCredentials && true,
  };

  try {
    const response = await axios.get(
      `${process.env.VITE_BASE_URL}/${route}`,
      options
    );

    const { data, status } = response.data;
    if (status) {
      return data;
    }
    return response;
  } catch (error: any) {
    if (showAlert === true) {
      store.dispatch.notify.error({
        msg: error?.response?.data?.message,
      });
    }
  }
};

//  Post Call
const Post = async (route: any, payload: any, showAlert = true) => {
  const accessToken = store?.getState()?.auth?.token;
  try {
    const response = await axios.post(
      `${process.env.VITE_BASE_URL}/${route}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { status } = response.data;
    if (status) {
      return response.data;
    }
  } catch (error: any) {
    if (showAlert === true) {
      store.dispatch.notify.error({
        msg: error?.response?.data?.message,
      });
    }
  }
};

//  Patch Call
const Patch = async (route: any, payload: any, showAlert = true) => {
  const accessToken = store?.getState()?.auth?.token;
  try {
    const response = await axios.patch(
      `${process.env.VITE_BASE_URL}/${route}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data, status } = response.data;
    if (status) {
      return data;
    }
  } catch (error: any) {
    if (showAlert === true) {
      store.dispatch.notify.error({
        msg: error?.response?.data?.message,
      });
    }
  }
};

//  Put Call
const Put = async (route: any, payload: any, showAlert = true) => {
  const accessToken = store?.getState()?.auth?.token;

  try {
    const response = await axios.put(
      `${process.env.VITE_BASE_URL}/${route}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data, status } = response.data;
    if (status) {
      return data;
    }
  } catch (error: any) {
    if (showAlert === true) {
      store.dispatch.notify.error({
        msg: error?.response?.data?.message,
      });
    }
  }
};

//  Delete Call

const Delete = async (route: any, showAlert = true) => {
  const accessToken = store?.getState()?.auth?.token;

  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.delete(
      `${process.env.VITE_BASE_URL}/${route}`,
      headers
    );

    const { data, status } = response.data;
    if (status) {
      return data;
    }
  } catch (error: any) {
    if (showAlert === true) {
      store.dispatch.notify.error({
        msg: error?.response?.data?.message,
      });
    }
  }
};

export { Post, Put, Get, Patch, Delete };
