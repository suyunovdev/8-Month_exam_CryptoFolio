import { formatNumber, currencyType } from "../../utils";
import viewed from "../../assets/images/viewed.svg";
import unviewed from "../../assets/images/unviewed.svg";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack, PaginationItem } from "@mui/material";

function Table({ data, fetchData }) {
  const products = data;
  const navigate = useNavigate();
  const [type, , watch, setWatch] = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(null);
  let storedData = watch;

  function handleNavigate(elID, el) {
    if (elID) {
      const isExist = storedData.some((item) => item.id === elID);
      if (isExist) {
        navigate(`crypto/${elID}`);
        return;
      }

      const updatedData = [...storedData, el];
      localStorage.setItem("watchList", JSON.stringify(updatedData));
      setWatch(updatedData);
      navigate(`crypto/${elID}`);
    }
  }

  useEffect(() => {
    const storedPage = localStorage.getItem("page");
    if (storedPage) {
      setPage(parseInt(storedPage, 10));
    } else {
      setPage(1);
    }
  }, []);

  function handleChange(event, value) {
    setPage(value);
    localStorage.setItem("page", value.toString());
    fetchData(value);
    window.scrollTo(0, 350);
  }

  return (
    <>
      <div className="px-6 mb-5">
        <h2 className="text-3xl font-semibold text-white  text-center mt-4 mb-3 ">
          Cryptocurrency Prices by Market Cap
        </h2>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
          placeholder="Search For a Crypto Currency.."
          className="text-white w-full p-6 bg-transparent border bg-cyan-950 rounded-lg mb-5 placeholder-font-roboto"
        />
        <table className="w-full border-collapse">
          <thead className="bg-cyan-950 rounded-xl">
            <tr className="text-sm font-bold leading-6 tracking-wider text-white">
              <th className="px-4 py-5 text-left w-1/4 rounded-tl-lg">Coin</th>
              <th className="px-4 py-5 text-right w-1/5">Price</th>
              <th className="px-4 py-5 text-center w-1/4">24h Changes</th>
              <th className="px-4 py-5 text-right w-1/5 rounded-tr-lg">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((product, index) => {
                  let percents = Number(
                    product.price_change_percentage_24h
                  ).toFixed(2);
                  const isExist = storedData.some(
                    (item) => item.id === product.id
                  );
                  return (
                    <tr
                      key={index}
                      onClick={() => handleNavigate(product.id, product)}
                      className="cursor-pointer border-b border-gray-600 bg-gray-900"
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            width={50}
                          />
                          <div>
                            <h3 className="text-xl font-normal  uppercase text-white">
                              {product.symbol}
                            </h3>
                            <p className="text-sm font-normal  text-gray-400">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm font-normal  text-right text-white">
                        {currencyType(type)}{" "}
                        {formatNumber(product.current_price.toFixed(2))}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-4">
                          <img
                            src={isExist ? viewed : unviewed}
                            width={27}
                            className="cursor-pointer"
                            onClick={() => navigate(`/crypto/${product.id}`)}
                          />
                          <p className="text-sm font-medium  text-right">
                            {percents > 0 ? (
                              <span className="text-green-500">
                                +{percents}%
                              </span>
                            ) : (
                              <span className="text-red-500">{percents}%</span>
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="text-sm font-normal  text-right pr-4 text-white">
                        {currencyType(type)}{" "}
                        {formatNumber(
                          product.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div className="flex justify-center py-5">
          <Stack spacing={2}>
            <Pagination
              count={10}
              page={page}
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    backgroundColor: page === item.page ? "#3A3B3F" : "inherit",
                    color: "#ffffff",
                  }}
                />
              )}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
import PropTypes from "prop-types";

Table.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Table;
