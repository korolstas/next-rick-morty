import { client } from "@graphQl";
import { useAppSelector } from "@hooks/redux-hooks";
import { useCallback, useRef, Fragment, useState, useEffect } from "react";

interface Props<T> {
  data: T[];
  isLoading: boolean;
  maxPage: number;
  renderItem: (item: T) => JSX.Element;
  fetchMore: (page: number) => void;
}

const INITIAL_PAGE = 1;

export const InfiniteScroll = <T,>({
  data,
  maxPage,
  isLoading,
  renderItem,
  fetchMore,
}: Props<T>) => {
  const { search } = useAppSelector((state) => state.searchReducer);
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
    if (search !== undefined) setPage(1);
  }, [search]);

  useEffect(() => {
    if (page !== 1) fetchMore(page);
  }, [page]);

  return (
    <>
      {data.map((item, index) => {
        return <Fragment key={index}>{renderItem(item)}</Fragment>;
      })}
      <div ref={lastElementRef} />
    </>
  );
};
