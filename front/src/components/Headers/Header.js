import React from "react";
import {toast} from 'react-toastify'
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import UIStore from '../../store/UIStore';
import axios from "axios"
import {observer} from 'mobx-react'

@observer class Header extends React.Component {
    state = {data: null, countApply: null, loading: true};
    async componentDidMount() {
      UIStore.header = this;
      this.refresh();
    }

    refresh = async () => {
      try {
        let jobs = await axios.get(`/companies/${UIStore.user.id_company}/applications`);
        this.setState({countApply: jobs.data.length})
        } catch (e) {
        toast.error('Une erreur est survenue');
        }

      try {
        let jobs = await axios.get(`/companies/${UIStore.user.id_company}/jobs`);
        let application;// = await axios.get('/companies/1/applications');
        this.setState({
          data: jobs.data.length,
          loading: false});
        } catch (e) {
        toast.error('Une erreur est survenue');
      }
    }
    render() {
        return (
        <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Nombre d'offre
                          </CardTitle>
                          {this.state.loading ? (
                            <span className="h2 font-weight-bold mb-0">
                              {" "}
                              0{" "}
                            </span>
                          ) : (
                            <span className="h2 font-weight-bold mb-0">
                              {" "}
                              {this.state.data}{" "}
                            </span>
                          )}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Nombre d'application
                          </CardTitle>
                          {this.state.loading ? (
                            <span className="h2 font-weight-bold mb-0">
                              {" "}
                              0{" "}
                            </span>
                          ) : (
                            <span className="h2 font-weight-bold mb-0">
                              {" "}
                              {this.state.countApply}{" "}
                            </span>
                          )}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
