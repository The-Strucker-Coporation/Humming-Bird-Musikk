import { MouseEventHandler } from "react";

export interface BookProps {
  title: string;
  description: string;
  grade: number;
  category: "workbook" | "creative arts";
}

export interface FilterProps {
  category?: "workbook" | "creative arts";
  grade?: number;
  limit?: number;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface BookCardProps {
  title: string;
  description: string;
  grade: number;
  category: "workbook" | "creative arts";
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchCategoryProps {
  category: "workbook" | "creative arts";
  setCategory: (category: "workbook" | "creative arts") => void;
}

export interface SearchGradeProps {
  grade: number;
  setGrade: (grade: number) => void;
}
