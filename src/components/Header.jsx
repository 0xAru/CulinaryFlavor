import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/bg-header.jpg';

function Header() {
  return (
    <header className="relative bg-cover bg-center h-52 lg:h-96 text-gray-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav className="relative flex justify-between items-center px-2 md:px-10 bg-gradient-to-t from-transparent to-gray-700 backdrop-blur-sm rounded-b-lg">
      <Link to="/" className="text-xl md:text-2xl font-bold  hover:text-amber-100">CulinaryFlavor</Link>
        <ul className="flex space-x-3 md:space-x-8 justify-between p-4">
          <li><Link to="/shopping-list" className='md:text-xl hover:text-amber-100'>Courses</Link></li>
          <li><Link to="/calendar" className='md:text-xl hover:text-amber-100'>Planning</Link></li>
        </ul>
      </nav>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-amber-100 to-transparent backdrop-blur-sm"></div>
    </header>
  );
}

export default Header;