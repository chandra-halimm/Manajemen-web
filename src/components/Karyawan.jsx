import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlinePrinter,
  HiUserGroup,
} from "react-icons/hi";

const TableHeader = () => (
  <thead className="border-b font-medium text-white bg-sky-500 ">
    <tr>
      <th scope="col" className="px-6 py-4">
        No.
      </th>
      <th scope="col" className="px-6 py-4" hidden>
        Karyawan ID
      </th>
      <th scope="col" className="px-6 py-4">
        NIP
      </th>
      <th scope="col" className="px-6 py-4">
        Nama
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
        Jabatan
      </th>
      <th scope="col" className="px-6 py-4">
        Action
      </th>
    </tr>
  </thead>
);

const TableRow = () => {
  const [karyawanList, setKaryawanList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/karyawan",
    }).then((result) => setKaryawanList(result.data.data));
  }, []);

  return (
    <>
      {karyawanList.map((karyawan, i) => {
        const { karyawanId, nip, name, address, email, handphone, position } =
          karyawan;
        return (
          <tr
            key={i}
            className={`border-b dark:border-neutral-500 ${
              i % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
            <td className="whitespace-nowrap px-6 py-4" hidden>
              {karyawanId}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{nip}</td>
            <td className="whitespace-nowrap px-6 py-4">{name}</td>
            <td className="whitespace-nowrap px-6 py-4">{address}</td>
            <td className="whitespace-nowrap px-6 py-4">{email}</td>
            <td className="whitespace-nowrap px-6 py-4">{handphone}</td>
            <td className="whitespace-nowrap px-6 py-4">{position}</td>
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

const Karyawan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPosition, setIsOpenPosition] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalPosition() {
    setIsOpenPosition(false);
  }

  function openModalPosition() {
    setIsOpenPosition(true);
  }

  const [positionList, setPositionList] = useState([]);
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = () => {
    const requestingData = {
      nip: nip,
      name: name,
      address: alamat,
      email: email,
      handphone: handphone,
      position: position,
    };

    const data = axios({
      method: "POST",
      url: "http://localhost:8000/karyawan",
      data: requestingData,
    }).then(() => {
      alert("success adding karyawan data");
      closeModal();
      window.location.reload();
    });
    if (!data) {
      alert("fail add karyawan data");
    }
  };

  const addPosition = () => {
    const requestingData = {
      position: position,
    };

    axios({
      method: "POST",
      url: "http://localhost:8000/position",
      data: requestingData,
    }).then(() => {
      alert("success add position");
      window.location.reload();
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/position",
    }).then((result) => setPositionList(result.data.data));
  }, []);

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
              <button
                onClick={openModalPosition}
                className="px-6 py-2 bg-sky-500 rounded-md text-white mb-3 hover:bg-sky-700 duration-300"
              >
                <HiUserGroup fontSize={20} />
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
                          INPUT KARYAWAN
                        </Dialog.Title>
                        <div className="mt-4">
                          <form className="flex flex-col gap-2">
                            <label htmlFor="nip" value={""}>
                              NIP
                            </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="number"
                              placeholder="input nip"
                              onChange={(e) => setNip(e.target.value)}
                              id="nip"
                              required
                            />
                            <label htmlFor="nama">Nama Karyawan </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="text"
                              placeholder="input nama karyawan"
                              onChange={(e) => setName(e.target.value)}
                              id="nama"
                              required
                            />
                            <label htmlFor="alamat">Alamat </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="text"
                              placeholder="input alamat"
                              onChange={(e) => setAlamat(e.target.value)}
                              id="alamat"
                              required
                            />
                            <label htmlFor="email">Email </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="email"
                              placeholder="input Email"
                              onChange={(e) => setEmail(e.target.value)}
                              id="email"
                              required
                            />
                            <label htmlFor="handphonne">Handphone </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="number"
                              placeholder="input handphonne"
                              onChange={(e) => setHandphone(e.target.value)}
                              id="handphonne"
                              required
                            />

                            <label htmlFor="position">Jabatan </label>
                            <select
                              id="position"
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              onChange={(e) => setPosition(e.target.value)}
                              defaultValue=""
                              required
                            >
                              <option value="" disabled>
                                Pilih Posisi
                              </option>
                              {positionList.map((jabatan, i) => {
                                const { position } = jabatan;
                                return (
                                  <option
                                    key={i}
                                    value={position}
                                    className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                                  >
                                    {position}
                                  </option>
                                );
                              })}
                            </select>
                          </form>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              handleSubmit();
                            }}
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

            <Transition appear show={isOpenPosition} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModalPosition}
              >
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
                          INPUT JABATAN
                        </Dialog.Title>
                        <div className="mt-4">
                          <form className="flex flex-col gap-2">
                            <label htmlFor="nip" value={""}>
                              Position
                            </label>
                            <input
                              className="border-2 border-gray-300 py-2 px-2 rounded-md text-sm focus:outline-none active:outline-none focus:border-sky-500 focus:border-3"
                              type="text"
                              placeholder="input position"
                              onChange={(e) => setPosition(e.target.value)}
                              id="nip"
                              required
                            />
                          </form>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              addPosition();
                            }}
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

export default Karyawan;
