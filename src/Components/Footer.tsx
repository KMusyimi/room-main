import {JSX} from 'react';
import { Link } from 'react-router-dom';


export default function Footer(): JSX.Element {
  return (
    <div className="attribution">
      Challenge by <Link to="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</Link>.
      Coded by <Link to="https://github.com/KMusyimi" target='_blank'>Kennedy Musyimi</Link>.
    </div>)
}