export const containsDuplicate = (arr) => {
    const map = {} 
    for(let i = 0; i<arr.length; i++){
        map[arr[i]] = (map[arr[i]] || 0) + 1
        if(map[arr[i]] > 1) {
            return true
        }
    }
    return false
}