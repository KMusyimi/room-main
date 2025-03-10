import iconLeft from "../assets/images/icon-angle-left.svg";
import iconRight from "../assets/images/icon-angle-right.svg";
import * as React from "react";
import {useEffect, useState} from "react";
import throttleEvt from "../utils.ts";
import {Link} from "react-router-dom";
import iconArrow from '../assets/images/icon-arrow.svg'

export default function Home() {
    const [counter, setCounter] = useState(0);
    const [leftPosition, setLeftPosition] = useState(0);
    const [slideCount, setSlideCount] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect((): () => void => {
        const slideWrapper: HTMLElement | null = document.getElementById('slider-wrapper');
        const throttledResizeEvt = throttleEvt(resizeEvt, 2000);
        window.addEventListener('resize', throttledResizeEvt);
        setSlideWidth(slideWrapper ? slideWrapper.offsetWidth : 0);
        setLeftPosition(counter * slideWidth);

        setSlideCount(prev => {
            prev = document.querySelectorAll('.slide-list').length;
            return prev;
        });

        return () => {
            removeEventListener('resize', throttledResizeEvt);
        };
    }, [slideWidth, slideCount, counter]);

    function resizeEvt() {
        const slideWrapper: HTMLElement | null = document.getElementById('slider-wrapper');
        setSlideWidth(slideWrapper ? slideWrapper.offsetWidth : 0);
    }

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
                prevState = 0;
            }
            return prevState;
        })
    }

    return (
        <div className={'hero-container'}>
            <div id={'slider-wrapper'} className={'img-slider'}>
                <ul style={{left: `-${leftPosition}px`, width: `${slideCount * slideWidth}px`}}>
                    <li className={'slide-list'}></li>
                    <li className={'slide-list'}></li>
                    <li className={'slide-list'}></li>
                </ul>
            </div>
            <div className={'info-container'}>
                <div className={'sect-wrapper'}>
                    <section id={'section-1'} className={`hero-section ${counter === 0 ? 'active': ''}`} data-slide-content={`section-1`}>
                        <h1> Discover innovative ways to decorate</h1>
                        <p className={'light-txt'}> We provide unmatched quality, comfort, and style for property owners
                            across the country.
                            Our experts combine form and function in bringing your vision to life. Create a room in your
                            own style with our collection and make your property a reflection of you and what you love.
                        </p>
                    </section>
                    <section id={'section-2'} className={`hero-section ${counter === 1 ? 'active': ''}`} data-slide-content={`section-2`}>
                        <h1>We are available all across the globe</h1>
                        <p className={'light-txt'}> With stores all over the world, it's easy for you to find furniture
                            for your home or place of
                            business.
                            Locally, we’re in most major cities throughout the country. Find the branch nearest you
                            using
                            our
                            store locator. Any questions? Don't hesitate to contact us today.</p>
                    </section>
                    <section id={'section-3'} className={`hero-section ${counter === 2 ? 'active': ''}`} data-slide-content={`section-3`}>
                        <h1>Manufactured with the best materials</h1>
                        <p className={'light-txt'}>Our modern furniture store provide a high level of quality. Our
                            company has invested in advanced
                            technology
                            to ensure that every product is made as perfect and as consistent as possible. With three
                            decades of
                            experience in this industry, we understand what customers want for their home and
                            office.</p>
                    </section>
                    <Link to={'shop'} className={'cta'}>SHOP NOW <img src={iconArrow} alt={'black arrow icon image'}/></Link>
                </div>
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