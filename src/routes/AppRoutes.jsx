import { Navigate, Route, Routes } from "react-router-dom";
import Notes from "../pages/Notes";
import Trash from "../pages/Trash";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Notes />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;