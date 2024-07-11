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

// determine le nombre de tâche à faire
export const countToDo = (data) => {
  const taskToDo = data?.filter((task) => task.status === 1);
  return taskToDo.length;
};
// determine le nombre de tâche en cours
export const countTaskOnPending = (data) => {
  const taskOnPending = data?.filter((task) => task.status === 2);
  return taskOnPending.length;
};

// determine le nombre de tâche terminée
export const countCompleteTask = (data) => {
  const taskComplete = data?.filter((task) => task.status === 3);
  return taskComplete.length;
};

export const costomizeText = (status) => {
  switch (status) {
    case 1:
      return "Vous n'avez pas encore commencé cette tâche !";

    case 2:
      return "Vous n'avez pas encore terminé cette tâche !";
    case 3:
      return "Vous avez déjà terminé cette tâche !";

    default:
      break;
  }
};

// formater la date
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
