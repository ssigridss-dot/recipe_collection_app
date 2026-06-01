import { useState } from "react";

interface Props {
    initialData?: any;
    onSubmit: (formData: FormData) => void;
}

function RecipeForm({
    initialData,
    onSubmit
}: Props) {

    const [title, setTitle] =
        useState(initialData?.title || "");

    const [description, setDescription] =
        useState(initialData?.description || "");

    const [ingredients, setIngredients] =
        useState(initialData?.ingredients || "");

    const [instructions, setInstructions] =
        useState(initialData?.instructions || "");

    const [category, setCategory] =
        useState(initialData?.category || "");

    const [image, setImage] =
        useState<File | null>(null);

    const submitHandler = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("ingredients", ingredients);
        formData.append("instructions", instructions);
        formData.append("category", category);

        if (image) {
            formData.append("image", image);
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={submitHandler}>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)}
            />

            <textarea
                placeholder="Ingredients"
                value={ingredients}
                onChange={(e) =>
                    setIngredients(e.target.value)}
            />

            <textarea
                placeholder="Instructions"
                value={instructions}
                onChange={(e) =>
                    setInstructions(e.target.value)}
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                    setCategory(e.target.value)}
            />

            <input
                type="file"
                onChange={(e) => {

                    if (
                        e.target.files &&
                        e.target.files.length > 0
                    ) {
                        setImage(
                            e.target.files[0]
                        );
                    }

                }}
            />

            <button type="submit">
                Save
            </button>

        </form>
    );
}

export default RecipeForm;