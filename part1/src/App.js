const Part = (props) => {
  return (
  <p>
  {props.part.name}  {props.part.exercises}
</p>
  )
}

  const Header = (props) => {
    console.log(props)
   return <h1>{props.course.name}</h1>
 }

 const  content = [
  {
    name: 'Half Stack application development'
  },
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
    <p>Number of exercises: '{content[1].exercises + content[2].exercises + content[3].exercises}'</p>
  );
};

const App = () => {

  const Content = (props) => {
    return (
      <div>
        <Part part={props.content[1]} />
        <Part part={props.content[2]} />
        <Part part={props.content[3]} />
      </div>
    )
  }

  return (
    <div>
      <Header course={content[0]} />
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}


export default App;