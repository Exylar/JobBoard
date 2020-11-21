import React from "react";

import { Button, FormGroup, Input, Container, Row, Col } from "reactstrap";

import Cards from "../../components/Elements/Cards.js";
import { toast } from "react-toastify";
import axios from "axios";

class Job extends React.Component {
  state = { data: null, loading: true, dataSave: null,
            contract: '', intitule: '', localisation: ''};

  CreateCard = () => {
    let cards = [];

    for (let i = 0; i < 10; i++) {
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

  filter = () => {
    const {contract, intitule, localisation, dataSave} = this.state;
    let jobs = JSON.parse(JSON.stringify(dataSave));

    if (contract !== '')
      jobs = jobs.filter(i => i.contract.includes(contract))
    if (intitule !== '')
      jobs = jobs.filter(i => i.name.includes(intitule))
    if (localisation !== '')
      jobs = jobs.filter(i => i.city.includes(localisation) || i.country.includes(localisation) )

    this.setState({data: jobs})
  }

  async componentDidMount() {
    try {
      let job = await axios.get("/jobs");
      this.setState({ data: job.data, dataSave: job.data, loading: false });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }
  render() {
    return (
      <>
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped pb-150">
              <div className="shape shape-style-1 shape-primary">
                <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
                <span /> <span />
              </div>
              <Container className="d-flex align-items-center">
                <div className="col px-0">
                  <Row className="align-items-center justify-content-center">
                    <h1 className="text-white font-weight-bolder">
                      Trouver un job
                    </h1>
                  </Row>
                </div>
              </Container>
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
          </div>

          <section className="section section-components">
            <Container>
              <h1 className="font-weight-bolder h1">Filtre</h1>
              <Row>
                <Col lg="3">
                  <FormGroup>
                    <Input
                      className="form-control-alternative shadow"
                      placeholder="Type de contract"
                      type="text"
                      value={this.state.contract} onChange={e => this.setState({contract: e.target.value})}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Input
                      className="form-control-alternative shadow"
                      placeholder="Intitulé"
                      type="text"
                      value={this.state.intitule} onChange={e => this.setState({intitule: e.target.value})}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Input
                      className="form-control-alternative shadow"
                      placeholder="Localisation"
                      type="text"
                      value={this.state.localisation} onChange={e => this.setState({localisation: e.target.value})}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Button
                      className="btn btn-block form-control-alternative shadow my-0"
                      color="primary"
                      type="button"
                      onClick={this.filter}
                    >
                      Rechercher
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="section section-components">
            <Container>
              {this.state.loading ? (
                this.CreateCard().length
              ) : this.state.data.length == 0 ? (
                <p className="font-weight-bold text-center">
                  Aucune annonce trouvé
                </p>
              ) : (
                this.state.data.map((job, index) => (
                  <Row key={index}>
                    <Col lg="12">
                      <Cards data={job} />
                      <br />
                    </Col>
                  </Row>
                ))
              )}
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Job;
