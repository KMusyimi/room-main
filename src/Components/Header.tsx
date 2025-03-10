import {NavLink} from 'react-router-dom'
import * as React from "react";
import {JSX, useEffect, useState} from "react";
import iconLeft from './../assets/images/icon-angle-left.svg';
import iconRight from './../assets/images/icon-angle-right.svg';
import iconMenu from './../assets/images/icon-hamburger.svg';
import iconClose from './../assets/images/icon-close.svg';
import throttleEvt from '../utils.ts'

export default function Header(): JSX.Element {
    const [toggle, setToggle] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [counter, setCounter] = useState(0);
    const [leftPosition, setLeftPosition] = useState(0);
    const [slideCount, setSlideCount] = useState(0);

    useEffect((): () => void => {
            const slideWrapper: HTMLElement | null = document.getElementById('slider-wrapper');
            const slider: HTMLElement | null = document.querySelector('#slider-wrapper > ul');
            const slideWidth: number = slideWrapper ? slideWrapper.offsetWidth : 0;
            if (!slider) {
                throw {message: `${slider} null property`}
            }

            slider.style.width = `${slideCount * slideWidth}px`;

            const throttledResizeEvt = throttleEvt(resizeEvt, 1000);
            window.addEventListener('resize', throttledResizeEvt);

            setLeftPosition(counter * slideWidth);
            setSlideCount(prev => {
                prev = document.querySelectorAll('.slide-list').length;
                return prev;
            });


            function resizeEvt() {
                setWindowWidth(window.innerWidth);
            }

            return () => {
                removeEventListener('resize', throttledResizeEvt);
            };
        }, [slideCount, windowWidth, counter]
    )
    ;

    function handlePrevClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        setCounter(prev => {
            prev--;
            if (prev < 0) {
                prev = slideCount - 1;
            }
            return prev;
        })
    }

    function handleNextClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        setCounter(prevState => {
            prevState++;
            if (prevState === slideCount) {
                prevState = 0
            }
            return prevState;
        })
    }

    return (
        <div className={'hero-container'}>
            <header className={'header'}>
                {windowWidth < 600 &&
                    <button className={'nav-btn'} type={'button'} onClick={() => setToggle(prevToggle => !prevToggle)}>
                        <img src={toggle ? iconClose : iconMenu}
                             alt={toggle ? 'close icon image' : 'menu icon image'}
                             aria-label={'navigation menu button'}/>
                    </button>}
                <h1>room</h1>
                <nav
                    className={windowWidth < 768 ?
                        `main-nav--mobile ${toggle ? 'open' : ''}`
                        : 'main-nav'}>
                    <ul>
                        <li><NavLink to={'.'}>home</NavLink></li>
                        <li><NavLink to={'shop'}>shop</NavLink></li>
                        <li><NavLink to={'about'}>about</NavLink></li>
                        <li><NavLink to={'contact'}>contact</NavLink></li>
                    </ul>
                </nav>
            </header>
            <div id={'slider-wrapper'} className={'img-slider'}>
                <ul style={{left: `-${leftPosition}px`}}>
                    <li className={'slide-list'}></li>
                    <li className={'slide-list'}></li>
                    <li className={'slide-list'}></li>
                </ul>

            </div>
            <div className={'hero-wrapper'}>
                <section id={'section-1'} className={'hero-section'} data-slide-content={`section-1`}>
                    <h1>1</h1>
                </section>
                <section id={'section-2'} className={'hero-section'} data-slide-content={`section-2`}>
                    <h1>2</h1>
                </section>
                <section id={'section-3'} className={'hero-section'} data-slide-content={`section-3`}>
                    <h1>3</h1>
                </section>
                <div className={'btn-wrapper'}>
                    <button id={'prev'}
                            onClick={handlePrevClick}
                            className={'btn'} type={'button'}><img src={iconLeft} alt={'left button icon'}
                                                                   aria-label={'left slide icon button'}/>
                    </button>
                    <button id={'next'}
                            onClick={handleNextClick}
                            className={'btn'} type={'button'}><img src={iconRight} alt={'right button icon'}
                                                                   aria-label={'right slide icon button'}/>
                    </button>
                </div>
            </div>
        </div>
    )
}