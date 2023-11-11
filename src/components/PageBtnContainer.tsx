import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import styles from './page-btn.module.css'
import { Job } from '@/types/backendTypes';
import { redirect } from 'next/navigation';

const PageBtnContainer = ({
  jobs,
  totalJobs,
  currentPage,
  numOfPages,
  queryString,
}: {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  numOfPages: number;
  queryString: string;
}) => {
  // simple pagination -> display all pages numbers
  // not viable if high number
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const handleSearch = async (formData: FormData) => {
    "use server";

    const currentQuery = formData.get("currentQuery") as string;
    const page = formData.get("page") as string;
    let newQuery = currentQuery.replace(/page=\d+/g, `page=${page}`);
    if (currentQuery === newQuery) newQuery += `&page=${page}`;
    redirect(`/dashboard/all-jobs?${newQuery}`);
  };

  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <form
        method="post"
        // @ts-ignore
        action={handleSearch}
      >
        <input type="hidden" name="page" value={pageNumber} />
        <input type="hidden" name="currentQuery" value={queryString} />
        <button
          className={`btn ${styles.pageBtn} ${activeClass && styles.active}`}
          key={pageNumber}
          type="submit"
        >
          {pageNumber}
        </button>
      </form>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    // dots

    if (currentPage > 3) {
      pageButtons.push(
        <span className={`${styles.pageBtn} ${styles.dots}`} key="dots+1">
          ...
        </span>
      );
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }
    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }
    // one after current page

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className={`${styles.pageBtn} ${styles.dots}`} key="dots+1">
          ...
        </span>
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  // prev and next pages
  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = numOfPages;

  let nextPage = currentPage + 1;
  if (nextPage > numOfPages) nextPage = 1;

  return (
    <section className={styles.section}>
      <form
        method="post"
        // @ts-ignore
        action={handleSearch}
      >
        <input type="hidden" name="page" value={prevPage} />
        <input type="hidden" name="currentQuery" value={queryString} />
        <button className={`btn ${styles.prevBtn}`} type="submit">
          <ChevronLeftIcon />
          prev
        </button>
      </form>
      <div className={styles.btnContainer}>{renderPageButtons()}</div>
      <form
        method="post"
        //@ts-ignore
        action={handleSearch}
      >
        <input type="hidden" name="page" value={nextPage} />
        <input type="hidden" name="currentQuery" value={queryString} />
        <button className={`btn ${styles.nextBtn}`} type="submit">
          <ChevronRightIcon />
          next
        </button>
      </form>
    </section>
  );
};

export default PageBtnContainer