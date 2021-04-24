const Part = (props) => {
  return (
  <p>
  {props.part.name}  {props.part.exercises}
</p>
  )
}

const courseName = 'Half Stack application development'

  const Header = (props) => {
   return (
     <h1>{props.course}</h1>
   )
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
    <p>Number of exercises: '{content[0].exercises + content[1].exercises + content[2].exercises}'</p>
  );
};

const App = () => {

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
      <Header course={courseName} />
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}


export default App;
