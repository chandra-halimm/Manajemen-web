import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlinePrinter,
} from "react-icons/hi";
import axios from "axios";

const TableHeader = () => (
  <thead className="border-b font-medium text-white bg-sky-500 ">
    <tr>
      <th scope="col" className="px-6 py-4" hidden>
        Pembelian ID
      </th>
      <th scope="col" className="px-6 py-4">
        No.
      </th>
      <th scope="col" className="px-6 py-4">
        Nama Supplier
      </th>
      <th scope="col" className="px-6 py-4">
        Nama Barang
      </th>
      <th scope="col" className="px-6 py-4">
        harga
      </th>
      <th scope="col" className="px-6 py-4">
        stock
      </th>
      <th scope="col" className="px-6 py-4">
        Action
      </th>
    </tr>
  </thead>
);

const TableRow = () => {
  const [pembelianList, setPembelianList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/pembelian",
    }).then((result) => setPembelianList(result.data.data));
  }, []);

  return (
    <>
      {pembelianList.map((pembelian, i) => {
        const isEvenRow = i % 2 === 0;
        const { pembelianId, namaSupplier, namaBarang, harga, qty } = pembelian;
        return (
          <tr
            key={i}
            className={`border-b dark:border-neutral-500 ${
              isEvenRow ? "bg-gray-100" : "bg-white"
            }`}
          >
            <td hidden className="whitespace-nowrap px-6 py-4 font-medium">
              {pembelianId}
            </td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">{namaSupplier}</td>
            <td className="whitespace-nowrap px-6 py-4">{namaBarang}</td>
            <td className="whitespace-nowrap px-6 py-4">{harga}</td>
            <td className="whitespace-nowrap px-6 py-4">{qty}</td>
            <td className="whitespace-nowrap  py-4">{button}</td>
          </tr>
        );
      })}
    </>
  );
};

const button = (
  <div className="flex flex-row gap-2">
    <button className="border-2  border-gray-200 px-3 py-2 rounded-md hover:bg-sky-700 hover:text-white duration-300">
      <HiOutlinePencil fontSize={20} />
    </button>
    <button className="border-2  border-gray-200 px-3 py-2 rounded-md hover:bg-red-700 hover:text-white duration-300">
      <HiOutlineTrash fontSize={20} />
    </button>
  </div>
);

const Pembelian = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [barangList, setBarangList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [namaSupplier, setNamaSupplier] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [qty, setQty] = useState("");

  const addPembelian = () => {
    const requestingData = {
      namaSupplier: namaSupplier,
      namaBarang: namaBarang,
      harga: harga,
      qty: qty,
    };

    axios({
      method: "POST",
      url: "http://localhost:8000/pembelian",
      data: requestingData,
    }).then(() => {
      alert("add pembelian success");
      window.location.reload();
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/barang",
    }).then((result) => setBarangList(result.data.data));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/supplier",
    }).then((result) => setSupplierList(result.data.data));
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="flex gap-2">
              <button
                onClick={openModal}
                className="px-6 py-2 bg-sky-500 rounded-md text-white mb-3 hover:bg-sky-700 duration-300"
              >
                <HiOutlinePlus fontSize={20} />
              </button>
              <button className="px-6 py-2 bg-sky-500 rounded-md text-white mb-3 hover:bg-sky-700 duration-300">
                <HiOutlinePrinter fontSize={20} />
              </button>
            </div>

            {/* pembelian */}
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-9/12  max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          INPUT SUPLIER
                        </Dialog.Title>
                        <div className="mt-4">
                          <form className="flex flex-col gap-2">
                            <label htmlFor="supplier">Nama Supplier </label>
                            <select
                              id="supplier"
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              onChange={(e) => setNamaSupplier(e.target.value)}
                              defaultValue=""
                              required
                            >
                              <option value="" disabled>
                                Pilih Posisi
                              </option>
                              {supplierList.map((jabatan, i) => {
                                const { namaSupplier } = jabatan;
                                return (
                                  <option
                                    key={i}
                                    value={namaSupplier}
                                    className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                                  >
                                    {namaSupplier}
                                  </option>
                                );
                              })}
                            </select>
                            <label htmlFor="supplier">Nama Barang </label>
                            <select
                              id="supplier"
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              onChange={(e) => setNamaBarang(e.target.value)}
                              defaultValue=""
                              required
                            >
                              <option value="" disabled>
                                Pilih Posisi
                              </option>
                              {barangList.map((jabatan, i) => {
                                const { namaBarang } = jabatan;
                                return (
                                  <option
                                    key={i}
                                    value={namaBarang}
                                    className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                                  >
                                    {namaBarang}
                                  </option>
                                );
                              })}
                            </select>
                            <label htmlFor="harga">harga </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="harga"
                              placeholder="input harga"
                              id="number"
                              onChange={(e) => setHarga(e.target.value)}
                            />
                            <label htmlFor="number">Stock </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="qty"
                              placeholder="input qty"
                              id="qty"
                              onChange={(e) => setQty(e.target.value)}
                            />
                          </form>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => addPembelian()}
                          >
                            Submit
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            <table className="min-w-full text-left text-sm font-light bg-white">
              <TableHeader />
              <tbody>
                <TableRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembelian;
