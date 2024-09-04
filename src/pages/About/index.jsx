import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Loader from "../../components/Loader";
import Chart from "../../components/Chart";
import { formatNumber, currencyType, radioButtons } from "../../utils";
import parse from "html-react-parser";

function About() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [time, setTime] = useState("24");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useContext(DataContext);
  const { id } = useParams();
  const currency = type.toLowerCase();
  console.log(product);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  let description = String(product?.description?.en).split(".")[0];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex  w-full gap-8 mt-24 mx-auto py-10">
          <div className="border-r-2 border-gray-500 flex flex-col max-w-[25%] w-full p-5">
            <img
              src={product?.image?.large}
              width={200}
              alt={product?.name}
              className="mx-auto"
            />
            <h3 className="text-white text-4xl font-bold leading-tight text-center my-5 max-w-[545px]">
              {product?.name}
            </h3>
            <p className="max-w-[545px] text-base font-normal leading-7 mb-8">
              {parse(description)}
            </p>
            <div className="flex gap-2">
              <h3 className="text-lg font-bold mb-2">Rank:</h3>
              <span className="text-lg leading-8 tracking-wider">
                {product?.market_cap_rank}
              </span>
            </div>
            <div className="flex gap-2">
              <h3 className="text-lg font-bold mb-2">Current Price:</h3>
              <span className="text-lg leading-8 tracking-wider">
                {currencyType(type)}
                {formatNumber(product?.market_data?.current_price[currency])}
              </span>
            </div>
            <div className="flex gap-2">
              <h3 className="text-lg font-bold mb-2">Market Cap:</h3>
              <span className="text-lg leading-8 tracking-wider">
                {currencyType(type)}
                {formatNumber(product.market_data?.market_cap[currency])}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Chart id={id} days={time} />
            <div className="flex gap-10">
              {radioButtons.map((button) => (
                <div key={button.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={button.id}
                    name="priceType"
                    value={button.value}
                    checked={time === button.value}
                    onChange={(e) => setTime(e.target.value)}
                    className="hidden"
                  />
                  <label
                    htmlFor={button.id}
                    className={`inline-block px-5 py-3 border border-sky-400 rounded-md text-base font-medium cursor-pointer
                      ${time === button.value ? "bg-sky-400 text-black" : ""}
                    `}
                  >
                    {button.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
