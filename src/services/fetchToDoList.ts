import axios, { AxiosRequestConfig } from "axios";

export const fetchToDoList = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios(config);
    return data;
  } catch (error) {
    console.error(error);
  }
};
