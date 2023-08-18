import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import{ momo }from '../../Booking/momo';
import '../../../css/home/landingPage/services.css';

let reviewData = [
    {
        id: 1,
        title: 'Chuyên nghiệp - Tận tâm',
        detail: 'Đội ngũ Tư vấn viên & Chăm sóc Khách hàng kinh nghiệm, chuyên nghiệp, tận tâm. OcXanh cam kết bảo hành dịch vụ khi Khách hàng chưa hài lòng.',
        img: require('../../../assets/img/logo/homepage-logo/customer-service-logo.png'),
    },
    {
        id: 2,
        title: 'Ứng dụng OcXanh tiện lợi',
        detail: 'Tìm Người giúp việc nhà nhanh chóng qua vài thao tác. Ứng dụng cung cấp đầy đủ thông tin về dịch vụ và Người giúp việc, tiện lợi trong việc chủ động lựa chọn và đánh giá',
        img: require('../../../assets/img/logo/homepage-logo/smartphone-logo.png'),
    },
    {
        id: 3,
        title: 'Người giúp việc nhà tiêu chuẩn',
        detail: 'Người giúp việc nhà tiêu chuẩn, đáng tin cậy, có đầy đủ hồ sơ. Công ty OcXanh chịu trách nhiệm tuyển chọn, đào tạo và quản lý.',
        img: require('../../../assets/img/logo/homepage-logo/human-logo.png'),
    },
];

function HomeServices() {
    // const handle = () => {
    //     momo();
    // };
    return (
        <div id="service">
            <Container>
                <Row>
                    <div className="col-lg-12 text-center">
                        <div className="section-title">
                            <span>Tại sao chọn chúng tôi?</span>
                            <h2>Chúng tôi có nhiều tiêu chuẩn phù hợp với bạn</h2>
                        </div>
                    </div>
                </Row>
                <Row className="justify-content-center ms-0">
                    {reviewData.map((data) => (
                        <Col key={data.id} className="col-lg-4 col-md-6 col-sm-6">
                            <div className="overview-item">
                                <div className="overview-icon">
                                    <img src={data.img} />
                                </div>
                                <h4>{data.title}</h4>
                                <p>{data.detail}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className="overview-btn">
                    <Button variant="primary" type="submit">
                        Đặt dịch vụ ngay
                    </Button>
                </div>
            </Container>
        </div>
    );
}
export default HomeServices;
