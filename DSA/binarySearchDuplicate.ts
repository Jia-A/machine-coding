export const binarySearchDuplicate = (arr, target) => {
  let l = 0,
    r = arr.length - 1,
    mid = 0,
    index = -1
  while (l <= r) {
    mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) {index = mid; r=mid-1}
    else if (arr[mid] > target) r = mid - 1;
    else if (arr[mid] < target) l = mid + 1;
  }
  return index
};
 