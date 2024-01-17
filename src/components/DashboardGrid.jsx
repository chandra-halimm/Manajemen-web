import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DashboardGrid() {
  const [karyawanCountList, setKaryawanCountList] = useState(0);
  const [supplierCountList, setSupplierCountList] = useState(0);
  const [BarangCountList, setBarangCountList] = useState(0);
  const [hargaCountAll, sethargaCountAll] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pembelianResult = await axios.get(
          "http://localhost:8000/pembelian/count"
        );
        sethargaCountAll(pembelianResult.data.data);

        const barangResult = await axios.get(
          "http://localhost:8000/barang/count"
        );
        setBarangCountList(barangResult.data.data);

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
              {BarangCountList}
            </span>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            Jumlah Pembelian
            <span className="px-3 font-semibold text-lg text-green-600">
              {"Rp" + hargaCountAll}
            </span>
          </div>
        </BoxWrapper>
      </div>
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
