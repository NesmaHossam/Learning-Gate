import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem', // gap-y-4
      borderRadius: '0.375rem', // rounded-md
      backgroundColor: '#f3f4f6', // bg-richblack-800
      padding: '1.5rem' // p-6
    }}>
      <p style={{ 
        fontSize: '1.125rem', // text-lg
        fontWeight: '700', // font-bold
        color: '#1f2937' // text-richblack-5
      }}>
        Visualize
      </p>
      <div style={{ 
        display: 'flex',
        gap: '1rem', // space-x-4
        fontWeight: '600' // font-semibold
      }}>
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          style={{ 
            borderRadius: '0.25rem', // rounded-sm
            padding: '0.25rem 0.75rem', // p-1 px-3
            transition: 'all 0.2s', // transition-all duration-200
            backgroundColor: currChart === "students" ? '#1f2937' : 'transparent', // bg-richblack-700 or transparent
            color: currChart === "students" ? '#fbbf24' : '#f59e0b' // text-yellow-50 or text-yellow-400
          }}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          style={{ 
            borderRadius: '0.25rem', // rounded-sm
            padding: '0.25rem 0.75rem', // p-1 px-3
            transition: 'all 0.2s', // transition-all duration-200
            backgroundColor: currChart === "income" ? '#1f2937' : 'transparent', // bg-richblack-700 or transparent
            color: currChart === "income" ? '#fbbf24' : '#f59e0b' // text-yellow-50 or text-yellow-400
          }}
        >
          Income
        </button>
      </div>
      <div style={{ 
        position: 'relative',
        margin: 'auto', // mx-auto
        aspectRatio: '1', // aspect-square
        height: '100%', // h-full
        width: '100%' // w-full
      }}>
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
    
  )
}