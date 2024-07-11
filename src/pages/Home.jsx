import React, { useState } from "react";
import TaskTable from "../ui/TaskTable.jsx";
import Form from "../ui/AddForm.jsx";
import { MdPendingActions } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { GoGoal } from "react-icons/go";
import { useSelector } from "react-redux";
import { getAllTasks } from "../redux/tasks.slice.js";
import {
  countCompleteTask,
  countTaskOnPending,
  countToDo,
} from "../data/utils.js";

const Home = () => {
  const tasks = useSelector(getAllTasks);
  const [add, setAdd] = useState(false);

  // Faire appaître ou disparître le formulaire d'ajout
  const handleClickBtn = () => {
    setAdd((prev) => !prev);
  };

  return (
    <div className="p-5 md:px-14 flex flex-col gap-8 relative ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-slate-500 text-xl md:text-3xl">
          Bienvenue sur GesTâches
        </h1>

        {/* bouton d'ajout */}
        <button
          className="p-2 px-3 bg-purple-700 shadow-sm rounded-md text-sm md:text-base text-white font-semibold"
          onClick={handleClickBtn}
        >
          Ajouter une tâche
        </button>
      </div>

      <div className="flex justify-center flex-wrap gap-5 items-center ">
        <div className="min-w-[210px] w-[250px] h-[75px] flex  bg-red-100 rounded-md shadow-sm">
          <div className="w-2/3 bg-red-300 rounded-r-lg">
            <p className="capitalize text-xl font-semibold p-5 flex items-center h-full gap-2">
              <LuListTodo size={24} />
              <span> à faire</span>
            </p>
          </div>
          <div className="w-1/3 flex justify-center items-center text-xl font-semibold p-5">
            {countToDo(tasks)}
          </div>
        </div>

        <div className="min-w-[210px] w-[250px] h-[75px] flex  bg-yellow-100 rounded-md shadow-sm">
          <div className="w-2/3 bg-yellow-300 rounded-r-lg">
            <p className="capitalize text-xl p-5 font-semibold flex items-center h-full gap-2">
              <MdPendingActions size={24} className="" />
              <span> En coure</span>
            </p>
          </div>
          <div className="w-1/3 flex justify-center items-center text-xl font-semibold p-5">
            {countTaskOnPending(tasks)}
          </div>
        </div>

        <div className="min-w-[210px] w-[250px] h-[75px] flex  bg-green-100 rounded-md shadow-sm">
          <div className="w-2/3 bg-green-300 rounded-r-lg">
            <p className="capitalize text-xl font-semibold p-5 flex items-center h-full gap-2">
              <GoGoal size={24} />
              <span>Terminé</span>
            </p>
          </div>
          <div className="w-1/3 flex justify-center items-center text-xl font-semibold p-5">
            {countCompleteTask(tasks)}
          </div>
        </div>
      </div>

      {/*LISTE DES TACHES */}
      <TaskTable />

      {/* le modulaire comme un modal */}
      {add && <Form handleClickBtn={handleClickBtn} />}
    </div>
  );
};

export default Home;
