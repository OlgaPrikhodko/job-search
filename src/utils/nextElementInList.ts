const nextElementInList = <T>(list: T[], value: T): T => {
  const curIndex = list.indexOf(value);
  const nextValueIndex = (curIndex + 1) % list.length;
  const nextValue = list[nextValueIndex];
  return nextValue;
};

export default nextElementInList;
