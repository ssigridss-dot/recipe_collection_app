import axios from "axios";

const recipeApi = axios.create({
    baseURL: "https://localhost:7024/api"
});

export default recipeApi;