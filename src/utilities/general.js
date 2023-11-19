export const removeFromListById = (arr, id) => {
  if (!Array.isArray(arr)) {
    throw new Error("arr is not an array");
  }
  const indexToRemove = arr.findIndex((item) => item.id === id);
  if (indexToRemove !== -1) {
    arr.splice(indexToRemove, 1);
  }
};
