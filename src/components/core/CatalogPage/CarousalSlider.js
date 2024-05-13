import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CourseCard from "../../common/CourseCard";


const CarousalSlider = ({ courses }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    console.log("CarousalSlider")

    return (
        <div className='my-own-custom-container p-4'>
            <Carousel
                responsive={responsive}
                slidesToSlide={3}
                infinite={true}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={"desktop"}
                itemClass="carousel-item-padding-40-px mx-4 my-8"
            >
                {
                    courses.map((course)=> (
                        <CourseCard course={course} key={course._id}/>
                    ))
                }
            </Carousel>
        </div>
            
    )
}

export default CarousalSlider
