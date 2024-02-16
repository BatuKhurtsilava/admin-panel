import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <p className="text-xl font-bold text-darkBlue mb-6">Loading</p>
        <TailSpin
          visible={true}
          width="120"
          height="120"
          color="#04AA6D"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    </div>
  );
};

export default Loader;
