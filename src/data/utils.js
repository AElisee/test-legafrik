// l'url de la simulation de server
export const dataUrl = "http://localhost:5000/tasks/";

export const taskStatus = (status) => {
  switch (status) {
    case 1:
      return "À faire";
    case 2:
      return "En cours";
    case 3:
      return "Terminé";
    default:
      return "À faire";
  }
};

//Détermine le nombre de tâche à faire
export const countToDo = (data) => {
  const taskToDo = data?.filter((task) => task.status === 1);
  return taskToDo?.length;
};
//Détermine le nombre de tâche en cours
export const countTaskOnPending = (data) => {
  const taskOnPending = data?.filter((task) => task.status === 2);
  return taskOnPending?.length;
};

//Détermine le nombre de tâche terminée
export const countCompleteTask = (data) => {
  const taskComplete = data?.filter((task) => task.status === 3);
  return taskComplete?.length;
};

//Affiche du texte en fonction du status de la tâche
export const costomizeText = (status) => {
  switch (status) {
    case 1:
      return "Cette tâche est encore à faire !";

    case 2:
      return "Cette tâche est encore  en cours !";
    case 3:
      return "Cette tâche est terminé !";

    default:
      break;
  }
};

// formater la date au format "jour/mois/année heure:minute"
export const DateFormater = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("fr-FR", options);
  return formattedDate;
};
