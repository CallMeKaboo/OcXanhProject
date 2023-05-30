import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../../../css/home/landingPage/about.css';
function AppAbout() {
    return (
        <div id="about" className="block d-flex align-items-center justify-content-center">
            <Container fluid>
                <div className="title text-center" id="">
                    <h2>Về OCXANH</h2>
                    <p>Ứng dụng dọn nhà, giúp việc</p>
                </div>
                <Row className="my-5">
                    <Col sm={6} className="d-flex justify-content-center">
                        <Image src={require('../../../assets/img/logo/homepage-logo/anh1.png')} />
                    </Col>
                    <Col sm={6}>
                        <div>
                            <h3>CÂU CHUYỆN</h3>
                            <div className="box1">
                                <img src={require('../../../assets/img/logo/homepage-logo/box1.png')} alt=''/>
                                <div className="pa2">
                                    <p>
                                        OCXANH lấy sứ mệnh và hình tượng vỏ ốc để nói về ngôi nhà. Nơi mà đi theo bạn
                                        suốt cả cuộc đời, nơi có những người thân yêu đợi bạn trở về sau một ngày làm
                                        việc mệt mỏi.
                                    </p>
                                </div>
                            </div>

                            <div className="box2">
                                <img src={require('../../../assets/img/logo/homepage-logo/box.png')} alt=''/>
                                <div className="pa3" id="message">
                                    <p>
                                        Chính từ những ý tưởng đó mà chúng tôi OCXANH là những người mang xứ mệnh giúp
                                        căn nhà bạn luôn gọn gàng sạch sẽ và an toàn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default AppAbout;
