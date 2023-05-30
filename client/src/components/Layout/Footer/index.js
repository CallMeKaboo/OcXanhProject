import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.css';


export default function AppFooter() {
    return (
        <Container fluid className="footer bg-dark">
            <Row className="mx-5 px-5">
                <Col className="fCol">
                    <div className="logo1">
                        <img src={require('../../../assets/img/logo/Logo.png')} alt='' />
                    </div>
                    <p>
                        Công Ty TNHH OCXANH
                        <br />
                        264 Đội Cấn, Phường Ngọc Hà, Quận Ba Đình, Tp.Hà Nội 72506
                        <br />
                        Mã số doanh nghiệp: 0313723825
                        <br />
                        Đại Diện Công Ty: Ông Đỗ Hồng Phúc
                        <br />
                        Chức vụ: Giám Đốc
                        <br />
                        Số điện thoại: 1900 636 736
                        <br />
                        Email: support@ocxanh.com
                    </p>
                    <div className="underdown">
                        <img src={require('../../../assets/img/download.png')} alt=''/>
                    </div>
                </Col>
                <Col className="fCol">
                    <p>
                        Về OCXANH
                        <br />
                        Tính năng
                        <br />
                        Giá trị
                        <br />
                        Blog
                        <br />
                        Tải app
                    </p>
                </Col>
                <Col className="fCol">
                    <p>Gương mặt đại diện</p>
                    <img src={require('../../../assets/img/anh5.png')} alt=''/>
                    <p>Theo dõi chúng tôi</p>
                    <div className="icon">
                        <i className="bx fa-brands fa-facebook"></i>
                        <i className="bx fa-brands fa-instagram"></i>
                        <i className="bx fa-brands fa-youtube"></i>
                        <i className="bx fa-brands fa-twitter"></i>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
