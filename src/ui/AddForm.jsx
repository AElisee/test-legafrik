import axios from "axios";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTask, getAllTasks } from "../redux/tasks.slice.js";
import { dataUrl } from "../data/utils.js";

const AddForm = ({ handleClickBtn }) => {
  const tasks = useSelector(getAllTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  //fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie que les champs ne sont pas vides
    if (!title || !description || !date) {
      setError("Tous les champs sont obligatoires !");
      return;
    }

    // verifie que cette tâche est unique
    const taskExist = tasks.find(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );

    if (taskExist) {
      setError("Une autre tâche existe déjà sous même titre");
      return;
    }

    const newTask = {
      title,
      description,
      startDate: date,
      status: 1,
    };

    try {
      axios.post(`${dataUrl}`, newTask).then(() => {
        // vide le formulaire lorsque l'ajout réussit
        setDate("");
        setDescription("");
        setTitle("");
        // cache le formulaire lorsque l'ajout réussit
        handleClickBtn(false);
        // mettre à jour l'état
        dispatch(fetchAsyncTask());
      });
    } catch (error) {
      setError(
        "Une erreur est survenue lors de l'ajout de la nouvelle tâche !"
      );
      console.log(error);
    }
  };
  return (
    <div className="addForm w-[95%] md:w-[600px] min-h-[200px] p-5  rounded-md z-50 border bg-white shadow-md">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-purple-700">
          Ajouter une tâche
        </div>
        <div className="w[60px] h-[60px]" onClick={handleClickBtn}>
          <IoCloseOutline size={24} className="cursor-pointer" />
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="title"
            className="font-semibold text-base text-slate-500"
          >
            Titre *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="La tâche"
            className="py-2 px-2 outline-none border rounded-md bg-gray-50"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="description"
            className="font-semibold text-base text-slate-500"
          >
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-2 outline-none border rounded-md resize-none bg-gray-50"
            placeholder="Decrivez la tâche"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="title"
            className="font-semibold text-base text-slate-500"
          >
            Date de debut *
          </label>
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Titre nouvelle tâche"
            className="py-2 px-2 outline-none border rounded-md bg-gray-50"
          />
        </div>

        {/* bouttons */}
        <div className="flex gap-3 justify-end pt-10">
          <button
            type="submit"
            className="px-3 py-2 font-semibold"
            onClick={handleClickBtn}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-3 py-2 rounded-md text-white font-semibold bg-purple-700 hover:bg-purple-600"
          >
            Envoyer
          </button>
        </div>

        {/* message en cas d'erreur */}
        <div>
          <p className="text-base text-center font-medium text-red-500">
            {error}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
