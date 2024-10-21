"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchCategory from "./SearchCategory";
import { FilterProps } from "@types"; // Import the FilterProps type

const SearchButton: React.FC<{ otherClasses: string }> = ({ otherClasses }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

const SearchBar: React.FC = () => {
  const [category, setCategory] = useState<"workbook" | "creative arts" | undefined>(undefined); // Use undefined
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category && searchTerm.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(searchTerm.toLowerCase(), category || "");
  };

  const updateSearchParams = (searchTerm: string, category: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchTerm) {
      searchParams.set("search", searchTerm);
    } else {
      searchParams.delete("search");
    }

    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchCategory
          category={category}
          setCategory={setCategory}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/search-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='search'
        />
        <input
          type='text'
          name='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search resources...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
