import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Container, currencyType, formatNumber } from "../../utils";

function Carousel({ data }) {
  const navigate = useNavigate();

  const [type] = useContext(DataContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function handleNavigate(id, el) {
    if (id) {
      const storedData = JSON.parse(localStorage.getItem("watchList")) || [];
      const isExist = storedData.some((item) => item.id === id);
      if (isExist) {
        navigate(`/crypto/${id}`);
        return;
      }
      const updatedData = [...storedData, el];
      localStorage.setItem("watchList", JSON.stringify(updatedData));
      navigate(`/crypto/${id}`);
    }
  }

  return (
    <div className="relative">
      <Container>
        <Slider
          {...settings}
          className="flex justify-around pl-[150px] [&_.slick-prev]:hidden [&_.slick-next]:hidden"
        >
          {data &&
            data.length > 0 &&
            data.map((el, index) => {
              let percent = Number(el.price_change_percentage_24h).toFixed(2);
              return (
                <div
                  key={index}
                  className="outline-none max-w-[140px] flex flex-col gap-[10px] items-center justify-center text-center cursor-pointer"
                  onClick={() => handleNavigate(el.id, el)}
                >
                  <img
                    className="m-[10px] auto"
                    width={80}
                    height={80}
                    src={el.image}
                    alt=""
                  />
                  <h4 className=" text-[16px] font-[400]  uppercase">
                    {el.symbol}
                    <span
                      className={`ml-[7px] text-[14px] font-[500]  ${
                        percent >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {percent > 0 ? `+${percent}` : `${percent}`}%
                    </span>
                  </h4>
                  <p className=" text-[22px] font-[500] ">
                    {currencyType(type)}{" "}
                    {formatNumber(el.current_price.toFixed(2))}
                  </p>
                </div>
              );
            })}
        </Slider>
      </Container>
    </div>
  );
}

import PropTypes from "prop-types";

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      price_change_percentage_24h: PropTypes.number.isRequired,
      current_price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default Carousel;
