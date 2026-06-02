import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeListPage from "./pages/RecipeListPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={
                        <RecipeListPage />
                    }
                />

                <Route
                    path="/create"
                    element={
                        <CreateRecipePage />
                    }
                />

                <Route
                    path="/edit/:id"
                    element={
                        <EditRecipePage />
                    }
                />

                <Route
                    path="/recipe/:id"
                    element={<RecipeDetailsPage />}
                />

            </Routes>

            <ToastContainer />

        </BrowserRouter>

    );
}

export default App;