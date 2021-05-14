const Part = (props) => {
  return (
    <p>
      {props.part.name}  {props.part.exercises}
    </p>
  )
}

const Header = (props) => {
   console.log(props)
  return <h1>{props.course.courseName}</h1>
}

const  content = [
{
  name: 'Fundamentals of React', exercises: 10
},
{
  name: 'Using props to pass data', exercises: 7
},
{
  name: 'State of a component', exercises: 14
}
]

const  Total = () => {
 return (
   content.map(object => object.exercises).reduce((acc, el) => acc + el, 0)
  )
}
  
const App = () => {

 const course = {
  id: 1,
   courseName: 'Half Stack application development',
    content: [
     {
      name: 'Fundamentals of React', exercises: 10, id: 1
     },
     {
      name: 'Using props to pass data', exercises: 7, id: 2
     },
     {
      name: 'State of a component', exercises: 14, id: 3
     }
    ]
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0]} />
      <Part part={props.content[1]} />
      <Part part={props.content[2]} />
    </div>
  )
}

return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <h3>total of {Total()} exercises</h3>
    </div>
  )
}

export default App;