import { Link } from 'react-router-dom';

export function Navigations() {
  return (
    <nav className="font-bold flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3>search</h3>
      <span>
        <Link className="mr-2" to="/">
          Home
        </Link>
        <Link to="/favorites">Favorites</Link>
      </span>
    </nav>
  );
}
