import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleTask from "./pages/SingleTask.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncTask } from "./redux/tasks.slice.js";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTask());
  }, []);

  return (
    // routage avec react-router-dom
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/taches/:taskId" element={<SingleTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
