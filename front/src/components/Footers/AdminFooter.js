import React from "react";

import { Row, Col } from "reactstrap";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
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
            </footer>
        );
    }
}

export default Footer;
