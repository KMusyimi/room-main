import {NavLink} from 'react-router-dom'
import {JSX, useEffect, useState} from "react";
import iconMenu from './../assets/images/icon-hamburger.svg';
import iconClose from './../assets/images/icon-close.svg';
import throttleEvt from '../utils.ts'

export default function Header(): JSX.Element {
    const [toggle, setToggle] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect((): () => void => {
            const throttledResizeEvt = throttleEvt(resizeEvt, 2000);
            window.addEventListener('resize', throttledResizeEvt);

            function resizeEvt() {
                setWindowWidth(window.innerWidth);
            }

            setToggle(prevState => {
                if (windowWidth >= 650) {
                    prevState = false
                }
                return prevState;
            });

            return () => {
                removeEventListener('resize', throttledResizeEvt);

            };
        }, [windowWidth]
    )


    return (
        <header className={'header'}>
            {windowWidth < 650 &&
                <button className={'nav-btn'} type={'button'} onClick={() => setToggle(prevToggle => !prevToggle)}>
                    <img src={toggle ? iconClose : iconMenu}
                         alt={toggle ? 'close icon image' : 'menu icon image'}
                         aria-label={'navigation menu button'}/>
                </button>}
            <h1>room</h1>
            <nav
                className={windowWidth < 650 ?
                    `main-nav--mobile ${toggle ? 'open' : ''}`
                    : 'main-nav'}>
                <ul>
                    <li><NavLink to={'.'}
                                 className={({isActive}) => isActive ? 'active' : ''}>home</NavLink>
                    </li>
                    <li><NavLink to={'shop'}
                                 className={({isActive}) => isActive ? 'active' : ''}>shop</NavLink>
                    </li>
                    <li><NavLink to={'about'}
                                 className={({isActive}) => isActive ? 'active' : ''}>about</NavLink>
                    </li>
                    <li><NavLink to={'contact'}
                                 className={({isActive}) => isActive ? 'active' : ''}>contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    )
}