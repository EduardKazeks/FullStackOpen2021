import course from './Course';

const Part = (props) => {
  return (
    <p>
      {props.part.name}  {props.part.exercises}
    </p>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course[0].courseName}</h1>
}

const content = [
  {
    name: 'Fundamentals of React', exercises: 10
  },
  {
    name: 'Using props to pass data', exercises: 7
  },
  {
    name: 'State of a component', exercises: 14
  },
  {
    name: 'Redux', exercises: 11
  }
]

const Total = () => {
  return (
    content.map(object => object.exercises).reduce((acc, el) => acc + el, 0)
  )
}

const secondTotal = () => {
  return (
    course[1].content.map(object => object.exercises).reduce((acc, el) => acc + el, 0)
  )
}

const App = () => {

  const Content = (props) => {
    return (
      <div>
        <Part part={props.content[0]} />
        <Part part={props.content[1]} />
        <Part part={props.content[2]} />
        <Part part={props.content[3]} />
      </div>
    )
  }

  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content content={content} />
        <h3>total of {Total()} exercises</h3>
        <h3>{course[1].courseName}</h3>
        <p>{course[1].content[0].name + " " + course[1].content[0].exercises}</p>
        <p>{course[1].content[1].name + " " + course[1].content[1].exercises}</p>
        <h3>total of {secondTotal()} exercises</h3>
      </div>
    )
  }

  return (
    <Course course={course} />
  )
}

export default App;