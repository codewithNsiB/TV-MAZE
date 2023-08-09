import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../Utils/Loader";
import TvCard from "../Component/TvCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTv = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.tvmaze.com/shows");
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
  }, []);
  console.log("data", data);
  const filterRating = data.filter((show) => show.rating.average >= 8.9);
  console.log(filterRating);
  console.log(current);

  if (error) return <p className="mt-5 py-5">{error.message}</p>;

  //always pass a key when using a map in react, the key should be in the child
  //if the data does not have an id use index for mapping
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-lg-flex">
            <Container className="py-4 ">
              {filterRating.slice(0, 3).map((show, index) => (
                <>
                  <div
                    key={show.id}
                    className={
                      index === current
                        ? "bgColorA text-white p-1"
                        : "textColor"
                    }
                    type="button"
                  >
                    <h1
                      className="text-uppercase"
                      onClick={() => setCurrent(index)}
                    >
                      {" "}
                      {show.name}
                    </h1>
                  </div>
                  <hr />
                </>
              ))}
            </Container>
            <Container className="bgColorB py-4 text-white">
              {filterRating.slice(0, 3).map((show, index) => (
                <div key={show.id}>
                  {index === current && (
                    <>
                      <h1>{show.name}</h1>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: show.summary.slice(0, 200) + "...",
                        }}
                      />
                      <Link to={`/tvshows/${show.id}`}>See more</Link>
                    </>
                  )}
                </div>
              ))}
            </Container>
            <Container className="p-0">
              {filterRating.slice(0, 3).map((show, index) => (
                <div key={show.id}>
                  {index === current && (
                    <div className="imgBox">
                      <Image
                        className="w-100 h-100"
                        src={show.image.original}
                      />
                    </div>
                  )}
                </div>
              ))}
            </Container>
          </div>
          <Container className="mt-5 py-3">
            <Row>
              {data.slice(0, 30).map((show) => (
                <Col key={show.id} xs={6} md={4} lg={3}>
                  <TvCard data={show} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
