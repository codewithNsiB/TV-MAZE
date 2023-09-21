import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image} from "react-bootstrap";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import Loader from "../Utils/Loader";


export default function TvDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTv = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`
        );
        console.log(res);
        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTv();
  }, [id]);

  useEffect(() => {
    document.title = data?.name;
  }, [data?.name]);

  console.log("tvid", data);
  return (
    <div>
      {error && <p className="mt-5 text-center">{error.message}</p>}
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="p-0">
          <div className="d-flex align-items-center justify-content-between py-3 px-2 bgColorB">
            <div className="d-flex gap-2 align-items-center">
              <PiTelevisionBold size="50px" color="purple" />
              <span className="text-white fs-4">{data.name}</span>
              <span className="text-white-50 fs-5">{data.type}</span>
            </div>
            <span className="text-white-50 border p-1">{`rating:${data?.rating?.average}`}</span>
          </div>
          <Image
            src={data?.image?.original}
            style={{ height: "600", width: "100%" }}
            alt={data.name}
          />
          <Container>
            <div className="d-flex justify-content-between align-items-center p-4">
              <div className="d-flex align-items-center p-4">
                <FaBookOpen size="50px" color="purple" />
                <span className="fs-4 fw-bold textColor">Storyline</span>
              </div>
              <span className="textColor fs-5">{data.premiered}</span>
            </div>

            <hr className="textColor" />
            <p
              dangerouslySetInnerHTML={{ __html: data.summary }}
              className="textColor  p-3"
            />
            <div className="d-md-flex align-items-center justify-content-between mt-4 bgColorA p-3 ">
              <div className="d-md-flex justify-content-between align-items-center text-white">
                <span className="fw-bold me-2">Genres:</span>
                {data?.genres?.map((item, index) => (
                  <span key={index} className="me-2">
                    {item}
                  </span>
                ))}
              </div>
              <span className="fw-bold text-white me-2">
                Status:{data.status}
              </span>
            </div>
            <div className="mt-4 p-4">
              <h1 className="fs-4 textColor mb-4">Seasons</h1>
              <div className="d-flex gap-4 overflow-x-scroll">
                {data._embedded?.seasons?.map((season) => (
                  <div key={season.id}>
                    <Image
                      src={season?.image?.original}
                      style={{ width: "250px", height: "300px" }}
                      alt={data.name}
                    />
                    <p className="textColor">Season {season.number}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4">
              <h1 className="fs-4 textColor mb-4">Cast</h1>
              <div className="d-flex gap-4 overflow-x-scroll">
                {data._embedded?.cast?.map((item, index) => (
                  <div key={index}>
                    <Image
                      src={item.character?.image?.original}
                      alt={item.character?.name}
                      style={{ width: "120px", height: "120px" }}
                      className="rounded-circle"
                    />
                    <p className="textColor fs-6 textColor">
                      {item.character?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Container>
      )}
    </div>
  );
}
