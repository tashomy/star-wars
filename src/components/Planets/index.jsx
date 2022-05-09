import React, { useEffect, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPlanets, getPagePlanets } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";
import ModalButtons from "../ModalButtons/index";
import ResidentsModal from "../DetailModals/ResidentsModal";
import Modal from "../Modal";

const Planets = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const { sendRequest, status, data, error } = useHttp(getPagePlanets, true);

  useEffect(() => {
    sendRequest(page.page);
  }, [sendRequest, page]);

  const passToModal = (type, id) => {
    setType(type);
    setID(id);
  };

  const closeModal = () => {
    setType(null);
    setID(null);
  };
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
    <div className="container planets-container">
      {type === "residents" && (
        <Modal title={"Residents"} onClick={closeModal}>
          <ResidentsModal title={"Residents"} id={id} />
        </Modal>
      )}
      <Carousel>
        {data.map((vehicle, i) => {
          return (
            <Carousel.Item key={i}>
              {/* <img
                src="https://images.unsplash.com/photo-1648737966661-22e0c69d5aa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                alt=""
              /> */}
              <div className="my-card planets-card">
                <h3>{vehicle.name}</h3>
                <p>
                  <span>Population:</span> {vehicle.population} <br />
                  <span>Climate:</span> {vehicle.climate}
                  <br />
                  <span>Terrain:</span> {vehicle.terrain} <br />
                </p>
              </div>
              <ModalButtons
                className="pilot-starship-modal-btns"
                onClick={passToModal}
                id={id}
                page={page.page}
                content={[{ text: "Residents" }]}
                url={vehicle.url}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Paginate
        className="planets-paginate"
        change={changePage}
        num={6}
        pageProp={page.page}
      />
    </div>
  );
};

export default Planets;
