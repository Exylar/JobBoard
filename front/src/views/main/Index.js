import React from "react";

import { Container, Row, Col, FormGroup } from "reactstrap";

import axios from "axios";

import Cards from "../../components/Elements/Cards";
import Header from "../../components/Headers/MainHeader.js";
import { toast } from "react-toastify";

class Index extends React.Component {
  state = { data: null, loading: true };

  CreateCard = () => {
    let cards = [];

    for (let i = 0; i < 3; i++) {
      cards.push(
        <Row>
          <Col>
            <FormGroup>
              <Cards />
            </FormGroup>
          </Col>
        </Row>
      );
    }
    return cards;
  };

  async componentDidMount() {
    try {
      let job = await axios.get("/jobslast");
      this.setState({ data: job.data, loading: false });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }
  render() {
    return (
      <>
        <main ref="main">
          <Header />
          <Container>
            <section className="section section-components">
              <h1 className="font-weight-bolder h1">Derniers job postés</h1>
              <br></br>
              {this.state.loading ? (
                this.CreateCard().length
              ) : this.state.data.length == 0 ? (
                <p className="font-weight-bold text-center">
                  Aucune annonces posté
                </p>
              ) : (
                this.state.data.map((job, index) => (
                  <Row key={index}>
                    <Col>
                      <FormGroup>
                        <Cards data={job} />
                      </FormGroup>
                    </Col>
                  </Row>
                ))
              )}
            </section>
          </Container>
        </main>
      </>
    );
  }
}

export default Index;
