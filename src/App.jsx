import { Routes, Route } from 'react-router-dom';

import Admin from "components/Admin";
import Widget from "components/Widget";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/widget" element={<Widget />} />
      </Routes>
    </>
  );
}
