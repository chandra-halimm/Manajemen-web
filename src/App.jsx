import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/shared/Layout";
import Product from "./components/Product";
import Pembelian from "./components/Pembelian";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="pembelian" element={<Pembelian />} />
        </Route>

        <Route path="login" element={<div>This is login page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
