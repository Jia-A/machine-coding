export const maximumAverageSubarray = (arr, k) =>{
    let left=0, max = -Infinity, sum = 0
    for(let r=0; r<k; r++){
        sum = sum + arr[r]
        max = sum
    }

    for(let r=k; r<arr.length; r++){
       sum = sum + arr[r] - arr[left]
       max = Math.max(max, sum)
       left++
    }
    return max
}