import { useCallback, useRef, Fragment, useState, useEffect } from "react";

interface Props<T> {
  data: T[];
  search?: string;
  maxPage: number;
  isLoading: boolean;
  renderItem: (item: T) => JSX.Element;
  fetchMore: (page: number) => void;
}

const INITIAL_PAGE = 1;

export const InfiniteScroll = <T,>({
  data,
  maxPage,
  search,
  isLoading,
  renderItem,
  fetchMore,
}: Props<T>) => {
  const [page, setPage] = useState(INITIAL_PAGE);

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && page < maxPage) {
          setPage((page) => page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, page]
  );

  useEffect(() => {
    setPage(INITIAL_PAGE);
  }, [maxPage]);

  useEffect(() => {
    fetchMore(page);
  }, [page, search]);

  return (
    <>
      {data.map((item, index) => {
        return <Fragment key={index}>{renderItem(item)}</Fragment>;
      })}
      <div ref={lastElementRef} />
    </>
  );
};
