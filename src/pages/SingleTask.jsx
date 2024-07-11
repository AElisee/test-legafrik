import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAsyncTask, getAllTasks } from "../redux/tasks.slice.js";
import axios from "axios";
import { costomizeText, dataUrl } from "../data/utils.js";

const SingleTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getAllTasks);
  const { taskId } = useParams();
  const thisTask = tasks?.find((task) => task.id === taskId);

  // change le status de la tache au clic
  const changeStatus = async (e, status) => {
    e.preventDefault();

    const data = {
      ...thisTask,
      status: parseInt(status),
    };

    try {
      await axios.put(`${dataUrl}${thisTask.id}`, data).then(() => {
        dispatch(fetchAsyncTask());
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 md:px-20 flex  flex-col gap-10">
      <div className="flex justify-center items-center md:justify-between flex-col md:flex-row gap-4">
        <h1 className="font-bold text-lg md:text-2xl text-slate-500">
          Détail : {thisTask?.title}
        </h1>

        {/* Si la tâche  a déjà été terminé (status == 3) afficher ce masseage sans les boutons */}
        {thisTask?.status == 3 ? (
          <div className="px-3 py-2 bg-slate-400 rounded-md text-gray-900 font-semibold">
            Vous avez terminé cette tâche
          </div>
        ) : (
          // Sinon afficher les boutons
          <div className="flex gap-3">
            {/* si le status == 2, la tâches est en cours: je cache je bouton commencer */}
            <form
              onClick={(e) => changeStatus(e, 2)}
              className={`cursor-pointer px-3 py-2 bg-yellow-500 rounded-md text-white font-semibold ${
                thisTask?.status == 2 && "hidden"
              }`}
            >
              <input type="number" className="hidden" />
              Commencé
            </form>
            <form
              onClick={(e) => changeStatus(e, 3)}
              className="cursor-pointer px-3 py-2 bg-green-500 rounded-md text-white font-semibold"
            >
              <input type="number" className="hidden" />
              Terminé
            </form>
          </div>
        )}
      </div>

      <div
        className={`sm:w-full rounded-2xl border overflow-hidden 
          ${thisTask?.status == 1 ? "border-red-300" : ""}
          ${thisTask?.status == 2 ? "border-yellow-300" : ""}
          ${thisTask?.status == 3 ? "border-green-300" : ""}
        `}
      >
        <div
          className={`p-4 text-lg font-semibold 
            ${thisTask?.status == 1 ? "bg-red-100" : ""}
            ${thisTask?.status == 2 ? "bg-yellow-100" : ""}
            ${thisTask?.status == 3 ? "bg-green-100" : ""}
          `}
        >
          {costomizeText(thisTask?.status)}
        </div>
        <div className="flex flex-col gap-2 p-5  items-center">
          <h2 className="text-2xl text-slate-600 font-semibold">
            {thisTask?.title}
          </h2>
          <p className="text-base font-medium">Debut : {thisTask?.startDate}</p>
        </div>
        <p className="p-5 text-base text-center">{thisTask?.description}</p>
      </div>

      <div className="flex justify-end ">
        <Tooltip title="Retour à l'accueil">
          <Link
            to="/"
            className="px-4 py-2 rounded-md bg-purple-700 shadow-sm text-white font-semibold"
          >
            Retour
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default SingleTask;
