import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
    return (
      <>
        <Link to={`/courses/${course._id}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="">
              <img
                src={course?.thumbnail}
                alt="course thumnail"
                className={`${Height} w-full rounded-xl object-cover`}
              />
            </div>
            <div className="flex flex-col gap-2 px-4 py-3">
              <p className="text-xl text-gray-900">{course?.courseName}</p>
              <p className="text-sm text-gray-700">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className="text-gray-700">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
              <p className="text-xl text-gray-900">EGP {course?.price}</p>
            </div>
          </div>
        </Link>
      </>
    );
    
}

export default Course_Card
