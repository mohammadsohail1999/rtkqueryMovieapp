import axios from "axios";

export const TodoApiInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: "1000",
  timeoutErrorMessage: "request is bieng aborted",
});
