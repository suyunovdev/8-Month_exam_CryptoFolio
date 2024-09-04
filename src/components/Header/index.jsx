import { useNavigate } from "react-router-dom";
import WatchList from "../WatchList";
import CurrencySelect from "../CurrencySelect";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-cyan-950 py-5 px-10 shadow-md fixed top-0 w-full z-50">
      <div className="flex justify-between items-center py-3 px-10">
        <h2
          className="text-[20px] font-bold  bg-cyan-950 text-sky-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CRYPTOFOLIO
        </h2>
        <div className="flex items-center gap-4 justify-center">
          <CurrencySelect />
          <WatchList />
        </div>
      </div>
    </div>
  );
}

export default Header;
