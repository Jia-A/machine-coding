export const twoSum = (arr : number[], target : number) =>{

    const map = {}
    for(let i = 0; i<arr.length ; i++){
        const comp = target - arr[i]
        if(map[comp] !== undefined && map[comp] !== i){
            return [map[comp], i]
        }
        map[arr[i]] = i
    }

}

