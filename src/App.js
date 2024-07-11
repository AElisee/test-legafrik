import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SingleTask from "./pages/SingleTask.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncTask } from "./redux/tasks.slice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTask());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taches/:taskId" element={<SingleTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
