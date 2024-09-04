import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/`);
  }

  return (
    <div className="w-screen h-screen box-border flex items-center justify-center bg-black text-[#54FE55] text-shadow-md text-6xl flex-col font-[Press_Start_2P]">
      <div className="flex flex-col items-center">
        <div className="text-8xl font-[Press_Start_2P]">404</div>
        <div className="text-xl mt-4 mb-16 font-[Press_Start_2P]">
          Not Found<span className="animate-blink">_</span>
        </div>
        <button
          onClick={handleClick}
          className="px-6 py-3 border-none rounded bg-[#9c8d8d] hover:bg-[#8c7d7d] cursor-pointer transition-all duration-200 font-[Press_Start_2P]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
