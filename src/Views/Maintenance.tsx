import { JSX, useEffect, useState } from "react";
import maintenance from '../assets/images/maintenance.svg';
import { Link, useLocation } from "react-router-dom";

export default function Maintenance(): JSX.Element {
  const location = useLocation();
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(prev => {
      prev = location.pathname.split(/\//g).slice(-1).toString();
      return prev.charAt(0).toUpperCase() + prev.slice(1);
    });
  }, [location.pathname]);

  return (
    <div className="site-construction">
      <section>
        <h1>{pathname} Under Construction</h1>
        <p className="light-txt">Our website is currently under construction. Bear with us, and we plan to deliver amazing and groundbreaking features. Thank you for your patience.</p>
      </section>
      <figure><img src={maintenance} alt="an image illustration of four construction workers " /></figure>
      <Link className="home-link" to={'/'} style={{ textTransform: 'uppercase', letterSpacing: '5px' }}>go home</Link>
    </div>);
}