import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import student from "../assets/IMG_0233.jpg";
import ppg from "../assets/piu_ppg.jpg";
import richard from "../assets/Richard's Class.jpg";

const LoadingSpinner = () =>
  <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />
  </div>;

export default function News() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://piueducation.org/api/v1/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch course.");
        } else {
          const data = await response.json();
          setCourses(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  function getColorClass(categoryId) {
    switch (categoryId) {
      case 1:
        return "bg-red-400 rounded-full px-2 text-white text-sm";
      case 2:
        return "bg-green-400 rounded-full px-2 text-white text-sm";
      case 3:
        return "bg-orange-400 rounded-full px-2 text-white text-sm";
      case 4:
        return "bg-slate-400 rounded-full px-2 text-white text-sm";
      default:
        return "bg-blue-400 rounded-full px-2 text-white text-sm";
    }
  }
  return (
    <div className="w-full bg-primary-background py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-between items-center my-3">
          <h2 className="text-4xl my-3 font-oswald font-medium"> COURSES</h2>
          <Link
            to="#!"
            className="flex flex-row items-center hover:underline gap-2"
          >
            <span className="text-gray-500">List All</span>
            <FaAngleRight className="lg:w-7 w-5 lg:h-7 h-5 lg:p-2 p-1 bg-gray-500 text-white rounded-full" />
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
          {courses.map((course, index) =>
            <Link
              to="{course.slug}"
              className="flex flex-col overflow-hidden"
              data-aos="fade-up"
              key={course.index}
            >
              <img
                src={`https://piueducation.org/storage/${course.image}`}
                alt=""
                className="object-cover lg:h-48 h-32 hover:scale-105 transition-all duration-200 ease-in"
              />
              <div className="py-2">
                <span
                  className={getColorClass(
                    course.category ? course.category.id : null
                  )}
                >
                  {course.category ? course.category.name : "No Category"}
                </span>
                <Link
                  to={course.slug}
                  className="lg:text-xl block hover:underline"
                >
                  {course.title}
                </Link>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
