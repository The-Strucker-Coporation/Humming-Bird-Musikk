import { FilterProps, BookProps } from "@types";  // Importing BookProps
import { BookData } from "../constants";  // Importing BookData from constants

// Fetch books based on the filters
export const fetchBooks = (filters: FilterProps): BookProps[] => {
  const { category, grade } = filters;
  let data: BookProps[] = [];  // Explicitly typing 'data' as an array of BookProps

  // Filter by category (workbooks or creative arts)
  if (category === "workbook") {  // Fixed mismatch in category comparison
    data = BookData.workbooks as BookProps[];  // Explicit type assertion to BookProps[]
  } else if (category === "creative arts") {
    data = BookData.creativeArts as BookProps[];  // Explicit type assertion to BookProps[]
  }

  // If grade is provided, filter by grade
  if (grade) {
    return data.filter((book) => book.grade === grade);
  }

  return data;  // Return the filtered or full data based on filters
};

// Update search params based on category and grade
export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};

// Delete specific search param like category or grade
export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLowerCase());
  return `${window.location.pathname}?${newSearchParams.toString()}`;
};
