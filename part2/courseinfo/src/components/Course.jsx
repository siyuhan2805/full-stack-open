const Course = ({courseInfo}) => {
    // map returns an array of the containing the exercises for each object in parts arr
    // reduce then iterates over that array map returned and summed it up
    const total = courseInfo.parts.map(obj => obj.exercises).reduce((totalExercises, currExercises) => totalExercises + currExercises)
  
    return (
      <div> 
        <Header course={courseInfo.name}/>
        <Content parts={courseInfo.parts}/>
        <Total sum={total}/>
      </div>
      
    )
}
  
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

// added code to allow for any number of Part components by iterating through the parts array
const Content = ({ parts }) => 
<>
    {/* rendering a collection of Part components */}
    {parts.map(part => <Part key={part.id} part={part}/>)}

</>

export default Course


