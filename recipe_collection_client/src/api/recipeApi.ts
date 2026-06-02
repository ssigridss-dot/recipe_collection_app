import axios from "axios";

const recipeApi = axios.create({
    baseURL: "https://localhost:7060/api"
});

export default recipeApi;