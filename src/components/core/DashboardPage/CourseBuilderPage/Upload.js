// import React, { useState, useRef, useEffect } from 'react'
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { useSelector } from 'react-redux';

// const Upload = ({ label, name, register, setValue, errors, pStyle, video = false, viewData = null, editData = null }) => {
//   const { editCourse, course } = useSelector((state) => state.course)
//   const [url, setUrl] = useState("")
//   const [thumbanil, setThumbnail] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )

//   useEffect(() => {
//     if (editData || viewData) {
//       setUrl(previewSource);
//     }
//   }, []);

//   const fileRef = useRef();

//   const changeHandler = (e) => {
//     const file = e.target.files[0];
//     setUrl(URL.createObjectURL(file));
//     setThumbnail(file)
//     console.log("video file" , file)
//   }
//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     setUrl(URL.createObjectURL(file));
//     setThumbnail(file)
//   }

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   }

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//   }

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//   }

//   const fileRefHandler = (e) => {
//     e.preventDefault();
//     fileRef.current.click();
//   }

//   useEffect(() => {
    
//     if (editCourse) {

     
//       // console.log(course)
//       if(video){
//         const video = editData ? editData : viewData ? viewData : ""
//         setUrl(video)
//         console.log("video",video)
//       }
//       else{
//         console.log("thumbnail",course?.thumbnail)
//         setUrl(course?.thumbnail)
//       }
      
//     }
//     register(name, {
//       required: {
//         value: true,
//         message: video ? "Please choose a video for your course." : "Choose a thumbnail for your course."
//       }
//     })
//   },[])

//   useEffect(() => {
//     setValue(name, thumbanil);
//   }, [url])
//   return (

//     <>
//       <p className={pStyle}>{label}</p>
//       <div className='py-8 px-3 flex flex-col justify-center items-center gap-2 w-full bg-richblack-700 rounded-md border-2 border-dashed border-richblack-600 text-lg text-richblack-400 mb-4'
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragEnter={handleDragEnter}
//         onDragLeave={handleDragLeave}>
//         {!url && (

//           <>
//             <div className='aspect-square w-12 bg-pure-greys-800 flex items-center justify-center rounded-full'>
//               <IoCloudUploadOutline className='text-yellow-50 text-3xl' />
//             </div>

//             <p>Drag and drop an {!video ? "image" : "video"} <span>
//               <span className='text-yellow-50 font-bold cursor-pointer' onClick={fileRefHandler}>Browse</span>
//               <label>
//                 <input
//                   name={name}
//                   type='file'
//                   accept={!video ? "image/png, image/jpg, image/jpeg" : "video/mp4"}
//                   className='hidden'
//                   onChange={changeHandler}
//                   ref={fileRef}

//                 />
//               </label>
//             </span></p>

//             <ul className='flex gap-12 list-disc text-sm'>
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </>

//         )}

//         {
//           url && (

//             <>
//               {
//                 !video ?
//               (
//                 <img src={url} alt="course-thumbnail" className='mx-3 h-64 object-cover rounded-md' />
//               )
//               :
//               (
//                 <video className='mx-3 h-64 object-cover rounded-md'>
//                 <source src={url} type="video/mp4"/>
//                 </video>
//               )
//               }

//               <button onClick={(e) => {
//               setUrl("")
//               setPreviewSource(null);
//               setThumbnail( null)}}>
//               Cancel</button>
//             </>

//           )
//         }


//       </div>
//       {
//         errors[name] && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             {
//               video ? ("Please Choose a lecture video") : ("Please choose a thumbnai for your course.")
//             }
//           </span>
//         )
//       }
//     </>

//   )
// }

// export default Upload

import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState("");
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    setPreviewSource( viewData ? viewData : editData ? editData : course?.thumbnail)
    register(name, { required: true })

  }, [register,course])

  useEffect(() => {
    setValue(name, selectedFile)
    
  }, [selectedFile, setValue,previewSource])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50" onClick={(e)=>{
              e.stopPropagation();
              inputRef.current.click();
            }}>Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
