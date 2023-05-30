import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../../css/home/landingPage/contact.css';

function AppContact() {
    return (
        <div id="contact">
            <Container>
                <Row>
                    <Col>
                        <Row className="pe-2">
                            <h2>Hãy liên hệ với chúng tôi để được hỗ trợ với bất kỳ thắc mắc nào.</h2>
                            <p>
                                Cảm ơn bạn đã quan tâm đến việc thuê Công ty dịch vụ vệ sinh OcXanh của chúng tôi. Chúng
                                tôi coi trọng việc giao tiếp với khách hàng.
                            </p>
                        </Row>
                        <Row className="">
                            <Col>
                                <div className="contact-details d-flex">
                                    <div className="icon">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h5>Địa chỉ:</h5>
                                        <p>165 Cầu Giấy, Dịch Vọng, Quận Cầu Giấy, Tp.Hà Nội</p>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="contact-details d-flex">
                                    <div className="icon">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h5>Email:</h5>
                                        <p>khaibui@gmail.com</p>
                                        <p>ocxanh5023@gmail.com</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col>
                                <div className="contact-details d-flex">
                                    <div className="icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h5>Điện thoại:</h5>
                                        <p>Hotline: +84 25688412300</p>
                                        <p>Mobile: +84 84261064</p>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="contact-details d-flex">
                                    <div className="icon">
                                        <i className="fa-regular fa-clock"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h5>Giờ làm việc:</h5>
                                        <p>08.00 - 20.00</p>
                                        <p>Cả tuần</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Form>
                            <Row className="mb-4">
                                <Form.Group as={Col} controlId="formGridEmail" className="me-3">
                                    <Form.Control type="fName" placeholder="Họ" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Control type="lName" placeholder="Tên" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-4">
                                <Form.Group as={Col} controlId="formGridAddress1" className="me-3">
                                    <Form.Control placeholder="Địa chỉ email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridAddress2">
                                    <Form.Control placeholder="Số điện thoại" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={4} placeholder="Lời nhắn..." />
                                </Form.Group>
                            </Row>

                            <Button variant="primary" type="submit">
                                Gửi tin nhắn
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default AppContact;
