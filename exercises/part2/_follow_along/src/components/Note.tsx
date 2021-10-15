const Note = (props: {content: string}) => {
    const {content} = props
  
    return (
      <li > 
        {content} 
      </li>
    )
}

export default Note