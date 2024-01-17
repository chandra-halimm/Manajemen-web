import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardGrid() {
  const [karyawanCountList, setKaryawanCountList] = useState(0);
  const [supplierCountList, setSupplierCountList] = useState(0);
  const [barangCountList, setBarangCountList] = useState([]);
  const [hargaCountAll, setHargaCountAll] = useState([]);
  const [pembelianList, setPembelianList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pembelianResult = await axios.get(
          "http://localhost:8000/pembelian/count"
        );
        setHargaCountAll([
          { name: "Pembelian", value: pembelianResult.data.data },
        ]);

        const barangResult = await axios.get(
          "http://localhost:8000/barang/count"
        );
        setBarangCountList([{ name: "Barang", value: barangResult.data.data }]);

        const pembelianAllList = await axios.get(
          "http://localhost:8000/pembelian/chart"
        );
        setPembelianList(pembelianAllList.data.data);

        const karyawanResult = await axios.get(
          "http://localhost:8000/karyawan/count"
        );
        setKaryawanCountList(karyawanResult.data.data);

        const supplierResult = await axios.get(
          "http://localhost:8000/supplier/count"
        );
        setSupplierCountList(supplierResult.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="bg-white rounded-sm p-4 flex-1 border-2 border-grey-200 flex flex-col mb-5">
        <h4 className="font-semibold text-gray-600 text-lg">Dashboard</h4>
      </div>

      <div className="flex gap-4">
        <BoxWrapper>
          <div>
            Karyawan{" "}
            <span className="px-3 font-semibold text-lg text-green-600">
              {karyawanCountList}
            </span>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            Supplier{" "}
            <span className="px-3 font-semibold text-lg text-green-600">
              {supplierCountList}
            </span>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            Barang{" "}
            <span className="px-3 font-semibold text-lg text-green-600">
              {barangCountList.length > 0 ? barangCountList[0].value : 0}
            </span>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            Jumlah Pembelian
            <span className="px-3 font-semibold text-lg text-green-600">
              {"Rp" + (hargaCountAll.length > 0 ? hargaCountAll[0].value : 0)}
            </span>
          </div>
        </BoxWrapper>
      </div>

      {pembelianList.length > 0 && (
        <BarChart
          className="mt-10"
          width={600}
          height={400}
          data={pembelianList}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="harga" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="harga" fill="#8884d8" />{" "}
        </BarChart>
      )}
    </section>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border-2 border-grey-200 flex items-center">
      {children}
    </div>
  );
}
