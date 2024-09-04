import Carousel from "../../components/Carousel";
import carouselBg from "../../assets/images/bgImage.jpg";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type] = useContext(DataContext);

  async function getData(page = 1) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${type}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [type]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="bg-cover bg-center h-[500px] items-center flex flex-col justify-center"
            style={{ backgroundImage: `url(${carouselBg})` }}
          >
            <h2 className="text-6xl font-bold leading-[72px] tracking-tight text-[#87ceeb] text-center  ">
              CRYPTOFOLIO WATCH LIST
            </h2>
            <p className="text-sm font-medium leading-6 text-[#a9a9a9] text-center ">
              Get all the Info regarding your favorite Crypto Currency
            </p>
            <Carousel data={products} />
          </div>
          <Table data={products} fetchData={getData} />
        </div>
      )}
    </div>
  );
}
export default Home;
