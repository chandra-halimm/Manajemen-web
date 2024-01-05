import React, { Fragment } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineBell, HiOutlineUser, HiOutlineCog } from "react-icons/hi";
import { Popover, Transition, Menu } from "@headlessui/react";

export default function Header() {
  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
        <HiMiniMagnifyingGlass
          fontSize={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 ml-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-80 border-2 border-gray-200 rounded-md p-2 pr-4 pl-11"
        />
      </div>
      <div className="flex items-center gap-4 mr-3">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-2 rounded-sm inline-flex items-center text-gray-600 hover:tex-opacity-100 focus:outline-none active:bg-gray-100">
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notification
                    </strong>
                    <div className="mt-2 p-1 text-sm">Thi is panel</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="p-2 rounded-sm inline-flex items-center text-gray-600 hover:tex-opacity-100 focus:outline-none active:bg-gray-100">
              <span className="sr-only">Open user menu</span>
              <div>
                <HiOutlineUser fontSize={24} />
                <span className="sr-only">Admin</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      // onClick={() => window.location.replace("/pembelian")}
                      className={`${
                        active ? " text-sky-500" : "text-gray-900"
                      } group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <HiOutlineCog
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <HiOutlineCog
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
