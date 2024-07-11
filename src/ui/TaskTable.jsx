import { useState } from "react";
import {
  deleteAsyncTask,
  fetchAsyncTask,
  getAllTasks,
} from "../redux/tasks.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";
import { HiChevronLeft } from "react-icons/hi2";
import { dataUrl, DateFormater, taskStatus } from "../data/utils.js";
import { CiEdit } from "react-icons/ci";
import { TbInfoSquareRounded } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import EditTaskForm from "./EditTaskForm.jsx";
import { GrStatusInfoSmall } from "react-icons/gr";
import axios from "axios";

const TaskTable = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = useSelector(getAllTasks);

  // paginatiion
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = tasks.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(tasks.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const preventPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  // ---

  // supprimer une tâche
  const handleDelete = (taskId) => {
    dispatch(deleteAsyncTask(taskId));
  };

  // faire appaître ou disparaître le formulaire d'édition
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEdit((prev) => !prev);
  };

  // change le status de la tache au clic
  const changeStatus = async (e, status, task) => {
    e.preventDefault();

    const data = {
      ...task,
      status: parseInt(status),
    };

    try {
      await axios.put(`${dataUrl}${task.id}`, data).then(() => {
        dispatch(fetchAsyncTask());
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-[270px]">
        {/* tableau de la liste des tâches */}
        <table className="w-full border rounded-2xl ">
          <thead className="border">
            <th className="w-1/12">ID</th>
            <th className="w-3/12">TITLE</th>
            <th className="w-3/12">DATE</th>
            <th className="w-2/12">STATUS</th>
            <th className="w-3/12">ACTIONS</th>
          </thead>
          <tbody>
            {records?.map((task) => (
              <tr key={task.id} className="text-center">
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{DateFormater(task.startDate)}</td>
                <td>
                  <span
                    className={`w-full p-1 px-3 rounded-md border 
                      ${task.status == 1 && "bg-red-300"} 
                    ${task.status == 2 && "bg-yellow-300"}
                      ${task.status == 3 && "bg-green-300"}`}
                  >
                    {taskStatus(task.status)}
                  </span>
                </td>
                <td className="flex gap-3 justify-end pr-5">
                  {task.status == 1 && (
                    <Tooltip title="Commencer">
                      <form onClick={(e) => changeStatus(e, 2, task)}>
                        <input type="number" className="hidden" />
                        <GrStatusInfoSmall className="text-[22px] cursor-pointer text-yellow-300" />
                      </form>
                    </Tooltip>
                  )}
                  {task.status == 2 && (
                    <Tooltip title="Terminer">
                      <form onClick={(e) => changeStatus(e, 3, task)}>
                        <input type="number" className="hidden" />
                        <GrStatusInfoSmall className="text-[22px] cursor-pointer text-green-300" />
                      </form>
                    </Tooltip>
                  )}

                  <Tooltip title="Détails">
                    <Link to={`/taches/${task.id}`}>
                      <TbInfoSquareRounded className="text-[24px]" />
                    </Link>
                  </Tooltip>

                  <Tooltip title="Modifier">
                    <span>
                      <CiEdit
                        className="text-[24px] cursor-pointer"
                        onClick={() => {
                          handleEdit(task);
                        }}
                      />
                    </span>
                  </Tooltip>

                  <Tooltip title="Suprimer">
                    <span>
                      <AiTwotoneDelete
                        className="text-[24px] cursor-pointer"
                        onClick={() => handleDelete(task.id)}
                      />
                    </span>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* --- */}
      </div>

      {/* bouton de pagination */}
      {nPage > 1 && (
        <nav className="p-2 pt-5 flex justify-center ">
          <ul className="flex gap-2 border px-2 py-1 items-center bg-gray-50  rounded-2xl">
            <li className="p-2">
              <a
                href="#"
                onClick={preventPage}
                className={`text-purple-700 font-bold ${
                  currentPage === 1 && "cursor-not-allowed text-gray-400"
                }`}
              >
                <HiChevronLeft size={22} />
              </a>
            </li>
            {numbers.map((number, index) => (
              <li
                key={index}
                className={` w-[32px] h-[32px] rounded-full flex items-center justify-center ${
                  currentPage == number
                    ? "bg-purple-600 text-white font-semibold"
                    : ""
                }`}
              >
                <a href="#" onClick={() => changeCurrentPage(number)}>
                  {number}
                </a>
              </li>
            ))}
            <li className="p-2">
              <a
                href="#"
                onClick={nextPage}
                className={`text-purple-700 font-bold ${
                  currentPage == nPage && "cursor-not-allowed text-gray-400"
                }`}
              >
                <HiChevronRight size={22} />
              </a>
            </li>
          </ul>
        </nav>
      )}
      {/*--- */}

      {/* Formulaire d'édition  */}
      {isEdit && <EditTaskForm handleEdit={handleEdit} task={selectedTask} />}
    </div>
  );
};

export default TaskTable;
