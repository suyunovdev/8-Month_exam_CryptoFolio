function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex items-center justify-center w-full max-w-[6rem] mt-12 mb-12">
        <div className="absolute rounded-full animate-pulsOut filter drop-shadow-[0_0_1rem_rgba(255,255,255,0.75)] before:absolute before:rounded-full before:animate-pulsIn before:content-[''] before:box-border before:w-full before:pb-[100%] before:shadow-[inset_0_0_0_1rem_white] after:absolute after:rounded-full after:content-[''] after:box-border after:w-[calc(100%-2rem)] after:pb-[calc(100%-2rem)] after:shadow-[0_0_0_0_white]"></div>
      </div>
    </div>
  );
}

export default Loader;
