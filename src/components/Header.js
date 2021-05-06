import { useLocation } from 'react-router'
import Button from './Button'

const Header = ({title, onAdd , showAdd}) => {
   
   const loc =useLocation()
   
    return (
        <header className = 'header'>
            <h1>{title}</h1>
            {loc.pathname ==='/' && <Button color={showAdd ? 'red' :'green'} text={showAdd? 'Close': 'Add'} onClick={onAdd}/>}
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}

export default Header
