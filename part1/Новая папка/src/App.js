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
 const Total = ({content}) => {
  return (
    <p>Number of exercises: {content[0].exercises + content[1].exercises + content[2].exercises}</p>
  );
};

const App = () => {

  const course = {
    courseName: 'Half Stack application development',
    content: [
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
      <Total content={content} />
    </div>
  )
}


export default App;