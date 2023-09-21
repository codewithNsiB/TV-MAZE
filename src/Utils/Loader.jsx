import Spinner from "react-bootstrap/Spinner";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center mt-5">
      {" "}
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}


