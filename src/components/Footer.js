import {Link} from 'react-router-dom'

const Footer = (e) => {
    return (
        <footer> 
            <p>Click Below to Open Contact Manager</p>
            <a href='https://elegant-perlman-bc4036.netlify.app/'>Contact Manager</a>
            <p>Copyright &copy; 2021</p>
            <Link to ='/About'>About</Link>
        </footer>
    )
}

export default Footer
