import React from "react";
import ReactStars from "react-rating-stars-component";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "../../App.css";
import { FaStar } from "react-icons/fa";

function ReviewSlider({ reviews }) {
  const truncateWords = 15;

  return (
    <div className="text-black">
      <div className="my-12 h-auto max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          navigation={true}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-4 bg-[#f3f4f6] p-6 text-[14px] text-black rounded-lg shadow-lg h-auto">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}%20${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-gray-800">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-gray-600">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-gray-700">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#fbbf24" // Adjusted active color to yellow
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
