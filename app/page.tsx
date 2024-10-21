import { HomeProps,BookCardProps } from "@types";
import { grades, categories } from "@constants";
import { BookCard, ShowMore, CustomFilter, Hero } from "@components";
import { BookData } from "@constants/BookData";

export default function Home({ searchParams }: HomeProps) {
  const categoryFilter = searchParams.category || "creative arts";
  const gradeFilter = searchParams.grade ? String(searchParams.grade) : "3";

  // Ensure books are filtered with a valid category type: "workbook" or "creative arts"
  const allBooks = [
    ...BookData.workbooks,
    ...BookData.creativeArts,
  ].filter(book => {
    return (
      book.category === categoryFilter &&
      book.grade === parseInt(gradeFilter) // Ensure grade comparison is numeric
    );
  });

  const isDataEmpty = allBooks.length < 1;

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Music Education Catalog</h1>
          <p>Explore our music theory workbooks and learning resources</p>
        </div>

        <div className='home__filters'>
          <div className='home__filter-container'>
            <CustomFilter
              title="Category"
              options={categories.map(category => ({
                title: category.title,
                value: category.value,
              }))}
              defaultValue={categoryFilter}
            />
            <CustomFilter
              title="Grade"
              options={grades.map(grade => ({
                title: `Grade ${grade.value}`,
                value: String(grade.value),
              }))}
              defaultValue={gradeFilter}
            />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__books-wrapper'>
              {allBooks.map((book) => (
                <BookCard book={book as BookCardProps} />

              ))}
            </div>

            <ShowMore
              pageNumber={Math.ceil((searchParams.limit || 10) / 10)}
              isNext={(searchParams.limit || 10) > allBooks.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>No books available for the selected filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}