import { fetchBooks } from "@utils";
import { HomeProps } from "@types";
import { grades, categories } from "@constants";
import { BookCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";

export default async function Home({ searchParams }: HomeProps) {
  const allBooks = await fetchBooks({
    category: searchParams.category || "workbook", // Default category
    grade: searchParams.grade || "1", // Default grade
    limit: searchParams.limit || 10,
    title: searchParams.title || "",
  });

  const isDataEmpty = !Array.isArray(allBooks) || allBooks.length < 1 || !allBooks;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Music Education Catalog</h1>
          <p>Explore our music theory workbooks and learning resources</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='Category' options={categories} />
            <CustomFilter title='Grade' options={grades} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__books-wrapper'>
              {allBooks?.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allBooks.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allBooks?.message}</p> {/* Handle message here */}
          </div>
        )}
      </div>
    </main>
  );
}
