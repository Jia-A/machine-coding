'use client'
import React, { useRef, useState } from 'react'

const OTP = () => {
    const [inputVal, setInputVal] = useState<string[]>(Array(6).fill(""))
    const inputRef = useRef<(HTMLInputElement | null)[]>([])

const handleInput = (e, i) => {
    const val = e.target.value
    setInputVal(prev => {
        const updated = [...prev]
        updated[i] = val
        return updated
    })
    if(val && i < 5) {
        inputRef.current[i + 1]?.focus()
    }
}

const handleDelete = (e, i) =>{
    if(e.key === "Backspace" && inputVal[i] === "") {
        inputRef.current[i - 1]?.focus()
    }
}

const handlePaste = (e) => {
        e.preventDefault()
    const str = e.clipboardData.getData('text').slice(0, 6)
    const digits = str.replace(/\D/g, '');
    const array = digits.split("")
    setInputVal(array)
    inputRef.current[5]?.focus()

}
  return (
    <div className='max-w-40 flex gap-3 m-4'>
        {inputVal.map((num, i)=>{
            return (
                <input key={i} max={9} type="number" ref={(el) => { inputRef.current[i] = el }} className='p-3 text-3xl border w-15 border-mauve-500' value={num} onChange={(e)=>handleInput(e, i)} onKeyDown={(e)=>handleDelete(e, i)} onPaste={(e)=> handlePaste(e)}/>
            )
        })}
    </div>
  )
}

export default OTP