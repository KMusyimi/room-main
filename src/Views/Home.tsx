import iconLeft from "../assets/images/icon-angle-left.svg";
import iconRight from "../assets/images/icon-angle-right.svg";
import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import throttleEvt from "../utils.ts";
import { Link } from "react-router-dom";
import iconArrow from '../assets/images/icon-arrow.svg';
import aboutDark from '../assets/images/image-about-dark.jpg';
import aboutWhite from '../assets/images/image-about-light.jpg';

export default function Home() {
    const [counter, setCounter] = useState(0);
    const [leftPosition, setLeftPosition] = useState(0);
    const [slideCount, setSlideCount] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    const nextSlide = useCallback(() => {
        setCounter(prevState => {
            prevState++;
            if (prevState === slideCount) {
                prevState = 0;
            }
            return prevState;
        });
    }, [slideCount]);

    useEffect((): () => void => {
        const slideWrapper: HTMLElement | null = document.getElementById('slider-wrapper');
        const throttledResizeEvt = throttleEvt(resizeEvt, 2000);
        let slideShowTimer: number | null | undefined = null;
        window.addEventListener('resize', throttledResizeEvt);

        slideShowTimer = setTimeout(nextSlide, 5000);

        setSlideCount(prev => {
            prev = document.querySelectorAll('.slide-list').length;
            return prev;
        });

        setSlideWidth(slideWrapper ? slideWrapper.offsetWidth : 0);
        setLeftPosition(counter * slideWidth);

        return () => {
            removeEventListener('resize', throttledResizeEvt);
            clearTimeout(slideShowTimer);
        };
    }, [slideWidth, slideCount, counter, nextSlide]);


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
        });
    }

    function handleNextClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        nextSlide();
    }

    return (
        <>
            <div className={'hero-container'}>
                <div id={'slider-wrapper'} className={'img-slider'}>
                    <ul style={{ left: `-${leftPosition.toString()}px`, width: `${(slideCount * slideWidth).toString()}px` }}>
                        <li className={'slide-list'}></li>
                        <li className={'slide-list'}></li>
                        <li className={'slide-list'}></li>
                    </ul>
                </div>
                <div className={'info-container'}>
                    <div className={'sect-wrapper'}>
                        <section id={'section-1'} className={`hero-section ${counter === 0 ? 'active' : ''}`}
                            data-slide-content={`section-1`}>
                            <h1> Discover <span>innovative</span> ways to decorate</h1>
                            <p className={'light-txt'}> We provide unmatched quality, comfort, and style for property
                                owners
                                across the country.
                                Our experts combine form and function in bringing your vision to life. Create a room in
                                your
                                own style with our collection and make your property a reflection of you and what you
                                love.
                            </p>
                        </section>
                        <section id={'section-2'} className={`hero-section ${counter === 1 ? 'active' : ''}`}
                            data-slide-content={`section-2`}>
                            <h1>We are <span>available</span> all across the globe</h1>
                            <p className={'light-txt'}> With stores all over the world, it's easy for you to find
                                furniture
                                for your home or place of
                                business.
                                Locally, we’re in most major cities throughout the country. Find the branch nearest you
                                using
                                our
                                store locator. Any questions? Don't hesitate to contact us today.</p>
                        </section>
                        <section id={'section-3'} className={`hero-section ${counter === 2 ? 'active' : ''}`}
                            data-slide-content={`section-3`}>
                            <h1>Manufactured with the <span>best</span> materials</h1>
                            <p className={'light-txt'}>Our modern furniture store provide a high level of quality. Our
                                company has invested in advanced
                                technology
                                to ensure that every product is made as perfect and as consistent as possible. With
                                three
                                decades of
                                experience in this industry, we understand what customers want for their home and
                                office.</p>
                        </section>
                        <Link to={'shop'} className={'cta'}>SHOP NOW <img src={iconArrow}
                            alt={'black arrow icon image'} /></Link>
                    </div>
                    <div className={'btn-wrapper'}>
                        <button id={'prev-btn'}
                            onClick={handlePrevClick}
                            className={'nav-btn btn'} type={'button'}><img src={iconLeft} alt={'left button icon'}
                                aria-label={'slide left icon button'} />
                        </button>
                        <button id={'next-btn'}
                            onClick={handleNextClick}
                            className={'nav-btn btn'} type={'button'}><img src={iconRight} alt={'right button icon'}
                                aria-label={'slide right icon button'} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={'about-container'}>
                <figure><img className={'about-img'} src={aboutDark}
                    alt={'two identical dark metallic arm chairs beside a white table with a white round bowl on top'} />
                </figure>
                <section className={'about-section'}>
                    <h1>ABOUT OUR FURNITURE</h1>
                    <p className={'light-txt'}>Our multifunctional collection blends design and function to suit your
                        individual taste.
                        Make each room unique, or pick a cohesive theme that best express your interests and what
                        inspires you. Find the furniture pieces you need, from traditional to contemporary styles
                        or anything in between. Product specialists are available to help you create your dream
                        space.</p>
                </section>
                <figure><img className={'about-img'} src={aboutWhite}
                    alt={'a white chair place in a white background'} /></figure>
            </div>
        </>
    )
}