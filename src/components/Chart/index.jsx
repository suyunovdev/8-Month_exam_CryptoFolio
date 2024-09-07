import { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { createTheme, ThemeProvider } from "@mui/material";
import { DataContext } from "../../context/DataContext";
// import Loader from "../Loader";

function Chart({ id, days }) {
  const [type] = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      mode: "dark", // Use "mode" instead of "type"
    },
  });

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${type}&days=${days}`
      );
      const data = await response.json();
      setProduct(data.prices);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [days, id, type, getData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
        {!product || loading ? (
          <BarLoader />
        ) : (
          <Line
            className="cursor-pointer"
            data={{
              labels: product.map((item) => {
                let date = new Date(item[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: product.map((item) => item[1]),
                  label: `Price ( Past ${days} Days ) in ${type}`,
                  borderColor: "skyblue",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
import PropTypes from "prop-types";
import { BarLoader } from "react-spinners";

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  days: PropTypes.number.isRequired,
};

export default Chart;
