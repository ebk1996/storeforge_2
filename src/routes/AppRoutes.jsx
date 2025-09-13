
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Stores from "../pages/Stores";
import CreateStore from "../pages/CreateStore";
import Design from "../pages/Design";
import Preview from "../pages/Preview";
import Publish from "../pages/Publish";
import Docs from "../pages/Docs";

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/new" element={<CreateStore />} />
      <Route path="/design/:id" element={<Design />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/publish/:id" element={<Publish />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
