import { Link } from "react-router-dom";

function Card({ cardInfo }) {
  return (
    <Link to={"/posts/" + cardInfo.id}>
      <div className="card">
        <p>{cardInfo.title}</p>
        {cardInfo.published && <p>{cardInfo.time_published}</p>}
      </div>
    </Link>
  );
}

export default Card;
