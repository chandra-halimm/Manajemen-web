import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/shared/Layout";
import Supplier from "./components/supplier";
import Pembelian from "./components/Pembelian";
import Barang from "./components/Barang";
import Login from "./components/Login";
import Karyawan from "./components/Karyawan";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="supplier" element={<Supplier />} />
          <Route path="pembelian" element={<Pembelian />} />
          <Route path="barang" element={<Barang />} />
          <Route path="karyawan" element={<Karyawan />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
