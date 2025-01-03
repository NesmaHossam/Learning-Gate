import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCategoryPageDetails } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Categories/Course_Card';
import CourseSlider from '../components/core/Categories/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Categories = () => {

    const { loading } = useSelector((state) => state.profile)
  const { categoriesName } = useParams()
  const [active, setActive] = useState(1)
    const [categoriesPageData, setcategoriesPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === categoriesName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[categoriesName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCategoryPageDetails(categoryId);
                console.log("PRinting res: ", res);
                setcategoriesPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !categoriesPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !categoriesPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className="bg-gray-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
              <p className="text-sm text-gray-300">
                {`Home / Categories / `}
                <span className="text-yellow-400">
                  {categoriesPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-gray-50">
                {categoriesPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-gray-200">
                {categoriesPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
      
          {/* Section 1 */}
          
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-gray-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-yellow-400 text-yellow-400"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-yellow-400 text-yellow-400"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
           
            <div >
              <CourseSlider
                Courses={categoriesPageData?.data?.selectedCategory?.courses}
              />
            </div>
            
          </div>
      
          {/* Section 2 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {categoriesPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={categoriesPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
      
          {/* Section 3 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {categoriesPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
      
          <Footer />
        </>
      );      
    }

    export default Categories