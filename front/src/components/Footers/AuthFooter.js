import React from "react";

import { Container, Row, Col } from "reactstrap";

class Login extends React.Component {
    render() {
        return (
            <>
                <footer className="py-5">
                    <Container>
                        <Row className="align-items-center justify-content-xl-between">
                            <Col xl="6">
                                <div className="copyright">
                                    © {new Date().getFullYear()}{" "}
                                    <a href="" className="font-weight-bold ml-1">
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

export default Login;
