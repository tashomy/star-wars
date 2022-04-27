import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPeople, getPagePeople } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";

const People = () => {
  const [page, setPage] = useState({ page: 1 });
  const { sendRequest, status, data, error } = useHttp(getPagePeople, true);

  useEffect(() => {
    sendRequest(page);
  }, [sendRequest, page]);

  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const changePage = (number) => {
    setPage({ page: number });
  };

  return (
    <div className="container people-container">
      <Row className="wrapper-people">
        {data.map((person, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <h3>{person.name}</h3>
              <p>
                <span>Birth year:</span> {person.birth_year}
                <br />
                <span>Gender:</span>{" "}
                {person.gender === "n/a" ? `who knows?` : person.gender} <br />
              </p>
            </Col>
          );
        })}
      </Row>

      <Paginate change={changePage} num={9} pageProp={page.page} />
    </div>
  );
};

export default People;
