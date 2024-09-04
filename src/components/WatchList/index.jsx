import React, { useContext, useState } from "react";
import { Drawer } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { formatNumber } from "../../utils";

function WatchList() {
  const [state, setState] = useState({ right: false });
  const [, , watch, setWatch] = useContext(DataContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const openModal = () => {
    setState({ ...state, right: true });
  };

  const removeItem = (index) => {
    const deleteWatchItem = [...watch];
    deleteWatchItem.splice(index, 1);
    localStorage.setItem("watchList", JSON.stringify(deleteWatchItem));
    setWatch(deleteWatchItem);
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="p-4 w-80 flex flex-col">
              <h3 className="text-xl font-bold ">WATCHLIST</h3>
              <div className="flex flex-col gap-4">
                {watch.length > 0 &&
                  watch.map((el, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 border rounded-md shadow-sm"
                    >
                      <img
                        src={el.image}
                        width={118}
                        height={118}
                        alt=""
                        className="mb-2"
                      />
                      <p className="text-lg font-semibold">
                        ${formatNumber(el.current_price)}
                      </p>
                      <button
                        className=" px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
      <button
        onClick={openModal}
        className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        WATCH LIST
      </button>
    </div>
  );
}
export default WatchList;
