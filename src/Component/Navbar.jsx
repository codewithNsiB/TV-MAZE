import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  console.log(searchQuery);

  const handleSubmit =(e)=>{
    e.preventDefault()
    if (searchQuery !==''){navigate(`/search/?q=${searchQuery}`)}
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-between align-item-center p-3 bgColorA"
    >
      {!showSearch &&
      <>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/" className="display-6 text-white fw-bold">
            TVMAZE
          </Link>
          <Link to="/tvshows" className="text-white-50">
            Tv shows
          </Link>
        </div>
        <FiSearch
          size="30px"
          color="white"
          type="button"
          onClick={() => setShowSearch(true)}
        />
      </>
      }
      {showSearch && (
        <form className="position-relative ms-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search tv... "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="position-absolute top-50 start-50 translate-middle"
          />

          <AiOutlineCloseCircle
            className="position-absolute top-50 end-0 translate-middle"
            type="button"
            onClick={()=> setShowSearch(false)}
          />
        </form>
      )}
    </Container>
  );
}
