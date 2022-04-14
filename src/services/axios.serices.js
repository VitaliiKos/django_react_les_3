import axios from "axios";

import baseURL from "../urls/urls";

export const axiosServices = axios.create({baseURL});