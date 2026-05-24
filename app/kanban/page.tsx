'use client'
import KanbanColumn from "@/components/KanbanColumn"
import { kanbanData } from "@/data/KanbanData"
import { useState } from "react"


const KanbanBoard = () => {
    const [data, setData] = useState(kanbanData)
  return (
    <div className="flex gap-4 m-5 flex-wrap">{data.map((column)=> {
        return ( <KanbanColumn key={column.id} column={column} data={data} setData={setData}/> )
    })}</div>
  )
}

export default KanbanBoard