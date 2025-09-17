import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryPageDetails } from '../services/operations/categoriesOperation';
import CarousalSlider from '../components/core/CatalogPage/CarousalSlider';

const Catalog = () => {

    const { categoryName } = useParams();
    const { categories } = useSelector((state) => state.category);
    const [currentCategory, setCurrentCategory] = useState(null)
    const [categoryCourses, setCategoryCourses] = useState([]);
    const [otherCourses, setOtherCourses] = useState([]);
    const [topSellingCourses, setTopSellingCourses] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            const category = categories.filter((category) => categoryName === category.categoryName.toLowerCase().replace(" ", "-"))
            setCurrentCategory(category[0]);
            const result = await getCategoryPageDetails({ categoryId: category[0]?._id });

            if (result) {
                if (result.selectedCategory && result.selectedCategory.course) {
                    setCategoryCourses(result.selectedCategory.course);
                }
                if (result.differentCategory && result.differentCategory.course) {
                    setOtherCourses(result.differentCategory.course);
                }
                if (result.mostSellingCourses && result.mostSellingCourses.course) {
                    setTopSellingCourses(result.mostSellingCourses.course);
                }
            }
        }

        fetchData();


    }, [categories])


    return (
        <>
            <div className='bg-richblack-800 py-8'>

                <div className='w-11/12 mx-auto flex flex-col gap-4'>
                    <h1 className='text-richblack-5 text-4xl font-bold'>{currentCategory?.categoryName || categoryName.toLowerCase().replace(" ", "-")}</h1>
                    <p className='text-xl text-richblack-200'>{currentCategory?.categoryDescription}</p>
                </div>

            </div>

            <div className='w-11/12 mx-auto flex flex-col gap-12 px-8 py-10'>

                <div className='flex flex-col gap-5 '>
                    <h1 className='text-2xl text-richblack-5 font-bold '>{`${currentCategory?.categoryName} Courses`}</h1>
                    {
                        categoryCourses?.length > 0 ? (
                            <CarousalSlider courses={categoryCourses} />
                        ) : (<div className='text-xl text-richblack-5 font-bold mx-auto'>No courses found</div>)
                    }
                </div>

                {
                    topSellingCourses?.length > 0 && (
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-2xl text-richblack-5 font-bold'>Top Selling Courses</h1>
                            <CarousalSlider courses={topSellingCourses} />
                        </div>
                    )
                }

                {
                    otherCourses?.length > 0 && (
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-2xl text-richblack-5 font-bold'>Other Courses</h1>
                            <CarousalSlider courses={otherCourses} />
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Catalog
