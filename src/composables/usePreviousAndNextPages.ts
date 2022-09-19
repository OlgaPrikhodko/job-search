import { computed } from "vue";

interface SimpleRef {
  value: number;
}

const usePreviousAndNextPages = (
  currentPage: SimpleRef,
  maxPage: SimpleRef
) => {
  const previosPage = computed(() => {
    const previosPage = currentPage.value - 1;
    const firstPage = 1;
    return previosPage >= firstPage ? previosPage : undefined;
  });

  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= maxPage.value ? nextPage : undefined;
  });

  return { previosPage, nextPage };
};

export default usePreviousAndNextPages;
