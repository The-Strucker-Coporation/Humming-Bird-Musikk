import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SearchCategoryProps } from "@types"; // Import the interface
import { footerLinks } from "@constants"; // Adjust the import path if necessary

const categories = footerLinks.map(link => link.title); // Extracting category titles from footerLinks

const SearchCategory: React.FC<SearchCategoryProps> = ({ category, setCategory }) => {
  const [query, setQuery] = useState("");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className='search-category'>
      <Combobox value={category} onChange={setCategory}>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px]'>
            <Image
              src='/category-icon.svg' // Update to an appropriate category icon
              width={20}
              height={20}
              className='ml-4'
              alt='category icon'
            />
          </Combobox.Button>

          <Combobox.Input
            className='search-category__input'
            displayValue={(item: string) => item} // Specify the item type as string
            onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder='Search categories...'
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              static
            >
              {filteredCategories.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className='search-category__option'
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredCategories.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-category__option ${active ? "bg-primary-blue text-white" : "text-gray-900"}`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {item}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchCategory;
