"use client";

import { useState } from "react";
import { BookCardProps as BookCardPropsType } from "@types"; // Update the import to use BookCardProps
import CustomButton from "./CustomButton";
import BookDetails from "./BookDetails"; // Assuming there is a BookDetails component

interface BookCardProps {
  book: BookCardPropsType; // Use the correct prop type for the book
}

const BookCard = ({ book }: BookCardProps) => {
  const { title, description, grade, category } = book;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="book-card group">
      <div className="book-card__content">
        <h2 className="book-card__content-title">{title}</h2>
      </div>

      <p className="flex mt-4 text-[20px] font-bold">Grade: {grade}</p>
      <p className="text-sm font-medium capitalize">Category: {category}</p>

      <div className="relative w-full h-40 my-3 object-contain">
        <img src='/placeholder-image.svg' alt='book cover' className="object-contain w-full h-full" />
      </div>

      <p className="book-card__description">{description.slice(0, 100)}...</p>

      <div className="relative flex w-full mt-2">
        <div className="book-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <BookDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} book={book} />
    </div>
  );
};

export default BookCard;
