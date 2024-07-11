import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { dataUrl } from "../data/utils.js";
import { fetchAsyncTask } from "../redux/tasks.slice.js";
import axios from "axios";
import { useDispatch } from "react-redux";

const EditTaskForm = ({ handleEdit, task }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const UpdateData = {
      title: title ? title : task?.title,
      description: description ? description : task?.description,
      startDate: date ? date : task.startDate,
      status: parseInt(status) ? parseInt(status) : task?.status,
    };

    try {
      await axios.put(`${dataUrl}${task.id}`, UpdateData).then(() => {
        setDate("");
        setDescription("");
        setTitle("");
        setStatus("");

        handleEdit(false);
        dispatch(fetchAsyncTask());
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addForm w-[95%] md:w-[600px] min-h-[200px] p-5  rounded-md z-50 border bg-white shadow-md">
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-slate-500">
          Modifier cette tâche
        </div>
        <div className="w[60px] h-[60px]" onClick={handleEdit}>
          <IoCloseOutline size={24} className="cursor-pointer" />
        </div>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="title"
            className="font-semibold text-base text-slate-500"
          >
            Titre
          </label>
          <input
            type="text"
            defaultValue={title ? title : task.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre nouvelle tâche"
            className="py-2 px-2 outline-none border rounded-md bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="description"
            className="font-semibold text-base text-slate-500"
          >
            Description
          </label>
          <textarea
            defaultValue={description ? description : task?.description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-2 outline-none border rounded-md resize-none bg-gray-50"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="description"
            className="font-semibold text-base text-slate-500"
          >
            Status
          </label>
          <select
            defaultValue={status ? status : task?.status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
            className="py-2 px-2 outline-none border rounded-md  bg-gray-50"
          >
            <option
              value={1}
              className={`py-2 ${
                task.status == 3 || task.status == 2 ? "hidden" : ""
              }`}
            >
              A faire
            </option>
            <option
              value={2}
              className={`py-2  ${task.status == 3 ? "hidden" : ""}`}
            >
              En cours
            </option>
            <option value={3} className="py-2 ">
              Terminé
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="title"
            className="font-semibold text-base text-slate-500"
          >
            Date de debut
          </label>
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            defaultValue={date ? date : task?.startDate}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Titre nouvelle tâche"
            className="py-2 px-2 outline-none border rounded-md  bg-gray-50"
          />
        </div>
        <div className="flex gap-3 justify-end pt-10">
          <button
            type="submit"
            className="px-3 py-2 font-medium"
            onClick={handleEdit}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-3 py-2 rounded-md text-white font-semibold bg-slate-500 hover:bg-slate-400"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
