import { Discuss } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      className="container-fluid d-flex flex-column 
            justify-content-center align-items-center vh-100"
    >
      <Discuss
        visible={true}
        height="150"
        width="150"
        ariaLabel="discuss-loading"
        wrapperStyle={{}}
        wrapperClass="discuss-wrapper"
        colors={["#00d4ff", "#00d4ff"]}
      />
    </div>
  );
};

export default Loading;
