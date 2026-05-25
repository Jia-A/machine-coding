export const validAnagram = (str1, str2) =>{
    if(str1.length !== str2.length){
        return false
    }

    const map1 = {}, map2 = {}
    for(let i=0; i<str1.length; i++){
        map1[str1[i]] = (map1[str1[i]] || 0) + 1
        map2[str2[i]] = (map2[str2[i]] || 0) + 1
    }

    for(const key in map1) {
        if(map1[key] !== map2[key]) return false
    }

    return true
}