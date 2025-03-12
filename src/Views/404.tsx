import { JSX } from "react";
import { Link } from "react-router-dom";

export default function NotFound(): JSX.Element {
  return (
    <div className="not-found">
      <p>Oops! Page Not Found</p>
      <h1>404</h1>
      <p>We are sorry, but the page you are requesting was not found</p>
      <Link className="home-link" to={'/'} style={{ textTransform: 'uppercase', letterSpacing: '5px' }}>go home</Link>
    </div>)
}