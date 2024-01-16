import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlinePrinter,
} from "react-icons/hi";

const TableHeader = () => (
  <thead className="border-b font-medium text-white bg-sky-500 ">
    <tr>
      <th scope="col" className="px-6 py-4">
        No.
      </th>
      <th scope="col" className="px-6 py-4" hidden>
        Supplier ID
      </th>
      <th scope="col" className="px-6 py-4">
        Nama Supplier
      </th>
      <th scope="col" className="px-6 py-4">
        Alamat
      </th>
      <th scope="col" className="px-6 py-4">
        Email
      </th>
      <th scope="col" className="px-6 py-4">
        Handphone
      </th>
      <th scope="col" className="px-6 py-4">
        Action
      </th>
    </tr>
  </thead>
);

const TableRow = () => {
  const [supplierList, setSupplierList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/supplier",
    }).then((result) => setSupplierList(result.data.data));
  }, []);

  return (
    <>
      {supplierList.map((karyawan, i) => {
        const { supplierId, namaSupplier, alamat, email, handphone } = karyawan;
        return (
          <tr
            key={i}
            className={`border-b dark:border-neutral-500 ${
              i % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
            <td className="whitespace-nowrap px-6 py-4" hidden>
              {supplierId}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{namaSupplier}</td>
            <td className="whitespace-nowrap px-6 py-4">{alamat}</td>
            <td className="whitespace-nowrap px-6 py-4">{email}</td>
            <td className="whitespace-nowrap px-6 py-4">{handphone}</td>
            <td className="whitespace-nowrap py-4">{button}</td>
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

const Supplier = () => {
  const [namaSupplier, setNamaSupplier] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");

  const addSupplier = () => {
    const requestingData = {
      namaSupplier: namaSupplier,
      alamat: alamat,
      email: email,
      handphone: handphone,
    };
    axios({
      method: "POST",
      url: "http://localhost:8000/supplier",
      data: requestingData,
    }).then(() => {
      alert("add supplier success");
      window.location.reload();
    });
  };

  const [isOpen, setIsOpen] = useState(false);

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
                            <label htmlFor="alamat">Nama Supplier </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="text"
                              placeholder="input alamat"
                              id="alamat"
                              onChange={(e) => setNamaSupplier(e.target.value)}
                            />

                            <label htmlFor="alamat">Alamat </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="text"
                              placeholder="input alamat"
                              id="alamat"
                              onChange={(e) => setAlamat(e.target.value)}
                            />
                            <label htmlFor="email">Email </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="email"
                              placeholder="input alamat"
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="number">Handphone </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="number"
                              placeholder="input alamat"
                              id="number"
                              onChange={(e) => setHandphone(e.target.value)}
                            />
                          </form>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => addSupplier()}
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

export default Supplier;
