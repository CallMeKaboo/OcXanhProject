import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../../CompoChild/Loading/loading';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';

function Reviews(props) {
    const { currentUser } = useContext(AuthContext);
    const [review, setReview] = useState([]);
    const [comment, setComment] = useState('');
    // Loading
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/reviews/${props.service_detail_id}`);
                setReview(res.data);
                setLoading(true);
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [props.service_detail_id]);

    const [activeItems, setActiveItems] = useState([]);
    const isItemActive = (value) => {
        const clickedIndex = activeItems.indexOf(value);
        return clickedIndex !== -1;
    };
    // handle star click
    const handleClick = (value) => {
        const activeItems = Array.from({ length: value }, (_, index) => index + 1);
        setActiveItems(activeItems);
    };

    const sendReview = async (e) => {
        e.preventDefault();
        try {
            if (activeItems.length == 0 && comment === '') {
                setError('Vui lòng chọn sao và nhập đánh giá');
            } else {
                const res = await axios.post('/api/reviews/post', {
                    user_id: currentUser.id,
                    service_detail_id: props.service_detail_id,
                    rating: activeItems.length,
                    comment: comment,
                });
                setComment('');
                setActiveItems([]);
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <div className="row mx-auto">
                <form className="col-6">
                    <div className="select-star">
                        <ul className="ul-star">
                            <li data-val={1} onClick={() => handleClick(1)}>
                                <i className={`iconratingnew-star--big ${isItemActive(1) ? 'active' : ''}`} />
                                <p>Rất tệ</p>
                            </li>
                            <li data-val={2} onClick={() => handleClick(2)}>
                                <i className={`iconratingnew-star--big ${isItemActive(2) ? 'active' : ''}`} />
                                <p>Tệ</p>
                            </li>
                            <li data-val={3} onClick={() => handleClick(3)}>
                                <i className={`iconratingnew-star--big ${isItemActive(3) ? 'active' : ''}`} />
                                <p className="active-slt">Bình thường</p>
                            </li>
                            <li data-val={4} onClick={() => handleClick(4)}>
                                <i className={`iconratingnew-star--big ${isItemActive(4) ? 'active' : ''}`} />
                                <p>Tốt</p>
                            </li>
                            <li data-val={5} onClick={() => handleClick(5)}>
                                <i className={`iconratingnew-star--big ${isItemActive(5) ? 'active' : ''}`} />
                                <p>Rất tốt</p>
                            </li>
                        </ul>
                    </div>
                    <div className="read-assess-form" style={{ display: 'block' }}>
                        <div className="textarea">
                            <div className="inputrating__group">
                                <textarea
                                    value={comment}
                                    onChange={handleChangeComment}
                                    className="ct"
                                    name="comment"
                                    placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm ..."
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        {error && <p className="text-danger">{error} !</p>}

                        <a className="submit-assess" onClick={sendReview}>
                            Gửi đánh giá ngay
                        </a>
                    </div>
                </form>
            </div>
            <div className="row mx-auto">
                <div className="col-6 comment comment--all ratingLst">
                    {loading ? (
                        review.map((val, index) => (
                            <div className="comment__item par" id="r-54303832">
                                <div className="item-top">
                                    <p className="txtname m-0">{val.fullName}</p>
                                </div>
                                <div className="item-rate">
                                    <div className="comment-star">
                                        {Array(val.rating)
                                            .fill()
                                            .map((index) => (
                                                <i className="icon-star" key={index} />
                                            ))}
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <p className="cmt-txt">{val.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    );
}

export default Reviews;
