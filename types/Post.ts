export type Post = {
    body : string, 
    id: number,
    title : string,
    userId : number
}

export type List = {
    posts : Post[]
}