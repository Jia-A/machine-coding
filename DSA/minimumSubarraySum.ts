export const minimumSubarraySum = (arr, target) => {
  let left = 0,
    min = Infinity,
    sum = 0;
  for (let right = 0; right < arr.length; right++) {
    sum = sum + arr[right];
    while (sum >= target) {
      min = Math.min(min, right - left + 1);
      sum = sum - arr[left];
      left++;
    }
  }
  return min;
};
