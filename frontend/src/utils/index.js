/**
 * Utility function for filtering list based on property
 * @param {*} list
 * @returns filtered list
 */
export const __filter__ = (list, property) => {
  const seen = new Set();
  return list.filter(
    (item) => !seen.has(item[property]) && seen.add(item[property])
  );
};
