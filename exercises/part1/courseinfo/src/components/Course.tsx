interface PartInterface {
    id: number,
    name: string,
    exercises: number
}

interface CourseInterface {
    id: number, 
    name: string,
    parts: PartInterface[]
}

function Part(props: {part: PartInterface}) {
    return (
        <p> {props.part.name + ' ' + props.part.exercises}</p>
    );
}

function Header(props: {course: string}) {
    return (
        <h1> {props.course} </h1>
    );
}

function Content(props: {parts: PartInterface[]}) {
    return (
        <p>
            {props.parts.map(part => <Part part={part}/>)}
        </p>
    );
}

function Total(props: {parts: PartInterface[]}) {
    const total = () => 
        props.parts.reduce((s, p) => {
            return s + p.exercises
        }, 0)

    return (
        <p>Number of exercises {total()}</p>
    );
}

const Course = (props: {course: CourseInterface}) => {
    return (
        <div>
        <Header course={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
        </div>
    );
}

export default Course