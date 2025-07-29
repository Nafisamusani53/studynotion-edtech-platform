import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

const Requirements = ({ label, name, placeholder, register, errors, setValue, getValues,pstyle  }) => {

    const { editCourse, course } = useSelector((state) => state.course)
    const [requirements, setRequirements] = useState("")
    const [requirementList, setRequirementList] = useState([])

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions)
          }
        register(name , {required : {
            value: true,
            validate: (value) => value > 0
        }})
    }, [course])

    const itemAddHandler = (e) => {
        e.preventDefault();
        if(requirements){
            setRequirementList([...requirementList, requirements]);
            setRequirements("")
        }
    }

    const itemRemoveHandler = (index) => {
        
        const newRequirements = [...requirementList];
        newRequirements.splice(index, 1);
        setRequirementList(newRequirements);
    }

    useEffect(() => {
        setValue(name, requirementList);
    },[requirementList])

    return (
        <label>
            <p className={pstyle}>{label}</p>
            <div>
            <input
                name= {name}
                id = {name}
                placeholder={placeholder}
                onChange={(e) => setRequirements(e.target.value)}
                value={requirements}
                className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
  px-3 py-3 text-lg focus-visible:outline-none mb-2'
            />
            <button className=' text-yellow-100' type='button' onClick = {itemAddHandler}>
            Add</button>
            </div>

            <ul>
                {
                    requirementList.map((item, index) => (
                        <li key={index}>
                        <span>{item}</span>
                        <button onClick = {(e) => {e.preventDefault(); itemRemoveHandler(index)}}
                            className='ml-2 text-sm text-richblack-400'>
                            clear
                        </button>
                        </li>
                    ))
                }
            </ul>
            {
                errors[name] && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
            Please write the requirements for the course.
          </span>
                )
            }
        </label>
    )
}

export default Requirements
