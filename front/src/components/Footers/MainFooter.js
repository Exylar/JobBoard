import React from "react";

import { Container, Row, Col } from "reactstrap";

class CardsFooter extends React.Component {
    render() {
        return (
            <>
                <footer className="footer has-cards">
                    <Container>
                        <Row className="align-items-center justify-content-md-between">
                            <Col md="6">
                                <div className="copyright">
                                    © {new Date().getFullYear()}{" "}
                                    <a href="#" className="font-weight-bold ml-1">
                                        JobBoard
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        );
    }
}

export default CardsFooter;
