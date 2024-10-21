"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@types";
import { updateSearchParams } from "@utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); // State for storing the selected option

  // Update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (e: { title: string; value: string }) => {
    // Check if e.value is a string before applying toLowerCase
    const newPathName = updateSearchParams(title, typeof e.value === "string" ? e.value.toLowerCase() : "");
    router.push(newPathName);
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Update the selected option in state
          handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron_up-down"
            />
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
