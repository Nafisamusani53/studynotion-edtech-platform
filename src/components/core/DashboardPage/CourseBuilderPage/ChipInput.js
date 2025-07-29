import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const ChipInput = ({ label, name, placeholder, register, errors, setValue, getValues, style, pStyle }) => {

    const { editCourse, course } = useSelector((state) => state.course)
    const [tags, setTags] = useState([])

    useEffect(() => {
            if(editCourse){
                setTags([...tags, course?.tag])
            }
        register(name, {
            required: {
                value: true,
                validate: (value) => value.length > 0
            }
        })

    }, [course])

    const addHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const item = event.target.value.trim();
            if (!tags.includes(item)) {
                setTags((prev) => ([...prev, item]))
            }
            event.target.value = "";
        }
    }

    const removeHandler = (index) => {
        const items = [...tags]
        items.splice(index, 1);
        setTags(items);
    }

    useEffect(()=> {
        setValue(name, tags);
    }, [tags])
    return (
        <label>
            <p className={pStyle}>{label}</p>
            <div className='flex flex-wrap gap-4 mb-2'>
                {
                    tags.map((tag, index) => (
                        <span className='text-richblack-5 p-2 
                        flex gap-2 bg-yellow-600 rounded-full 
                        border-[1px] border-richblack-5 text-sm items-center'
                        key={index}>
                            {tag}
                            <RxCross2 onClick = {(e) => {e.preventDefault(); removeHandler(index)}}/>
                        </span>
                    ))
                }
            </div>
            <input
                name={name}
                id={name}
                placeholder={placeholder}
                onKeyDown={addHandler}
                className={style}
            />
            {
                errors[name] && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Add the requried tags.
                    </span>
                )
            }
        </label>
    )
}

export default ChipInput
