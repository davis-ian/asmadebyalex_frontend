export const removeFromListById = (arr, id) => {
  if (!Array.isArray(arr)) {
    throw new Error("arr is not an array");
  }
  const indexToRemove = arr.findIndex((item) => item.id === id);
  if (indexToRemove !== -1) {
    arr.splice(indexToRemove, 1);
  }
};

export function debounce(func, delay) {
  let timerId;
  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
