import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/carousel.css";

const StyledBoxForNoti = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
});

const Carousel = ({ oauthToken }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [artworks, setArtworks] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Set loading state to true before making API call
    const url = "https://portus-api.herokuapp.com/api/v1/artworks";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
        },
      })
      .then((res) => {
        const data = res.data.data.slice(0, 5).map((artwork) => ({
          imageUrl: artwork.image_url,
          id: artwork.id,
        }));
        setArtworks(data);
        setLoading(false); // Set loading state to false when API call succeeds
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading state to false when API call fails
      });
  }, [oauthToken]);

  
  let slides_to_show;
  if (artworks.length <= 4) {
    slides_to_show = artworks.length;
  } else {
    slides_to_show = 4;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slides_to_show,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setCurrentSlide(currentSlide - 4);
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentSlide(currentSlide + 4);
    }
  };

  return (
    <>
      <div className="carousel-container">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : artworks.length > 0 && Object.keys(artworks[0]).length > 0 ? (
          <>
            <Slider {...settings} ref={sliderRef}>
              {artworks.map((artwork, index) => (
                <div key={index}>
                  <a href={`/details/${artwork.id}`}>
                    <img src={artwork.imageUrl} className="carousel-image" />
                  </a>
                </div>
              ))}
            </Slider>
            <div className="carousel-nav">
              <button
                className="carousel-nav-button carousel-prev"
                onClick={handlePrevClick}
              ></button>
              <button
                className="carousel-nav-button carousel-next"
                onClick={handleNextClick}
              ></button>
            </div>
          </>
        ) : (
          <StyledBoxForNoti></StyledBoxForNoti>
        )}
      </div>
    </>
  );
};

export default Carousel;
