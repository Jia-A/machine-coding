export const longestSubstringNoDuplicate = (str) => {
  let l = 0,
    max = 0,
    map = {};
  for (let r = 0; r < str.length; r++) {
    map[str[r]] = (map[str[r]] || 0) + 1;
    while(map[str[r]] > 1){
       delete map[str[l]]
        l++
    }
    max = Math.max(max,r - l + 1)
  }
  return max
};
