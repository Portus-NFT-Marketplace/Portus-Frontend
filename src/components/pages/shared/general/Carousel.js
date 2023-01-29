import React, {useState, useEffect} from "react";

import "./style/Carousel.css";

export const CarouselItem = ({children, width}) => {
    return (
        <div className="carousel-item" style={{ width:width}}>
            {children}
        </div>
    );
};

const Carousel = ({children}) => {
    const [activeIndex, setActionIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }

        setActionIndex(newIndex);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 3000)

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    })

    return (
        <div className="carousel">
            <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {width: "100%"});
                })}
            </div>
        </div>
    )
}

export default Carousel;