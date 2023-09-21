import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import TvCard from "../Component/TvCard";
import Loader from "../Utils/Loader";

export default function Tvshows() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tvShows = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.tvmaze.com/shows");
        setData(res.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    tvShows("thu", data);
  }, []);

  return (
    <div>
      {error && <p className="mt-5 text-center">{error.message}</p>}
      {loading ? (
        <Loader />
      ) : (
        <>
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
      )}{" "}
    </div>
  );
}
