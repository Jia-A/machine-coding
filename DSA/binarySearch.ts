export const binarySearch = (arr, target) => {
    let l=0, r=arr.length-1, mid=0;
    while(l<=r){
        mid = Math.floor((l+r)/2)
        if(arr[mid]===target) return mid;
        if(arr[mid] > target) r=mid-1;
        if(arr[mid] < target) l= mid+1;
    }

    return -1
}