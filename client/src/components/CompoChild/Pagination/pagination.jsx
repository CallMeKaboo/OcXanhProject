import React from 'react';
import './pagination.css';

function Pagination(props) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(props.totalItem / props.itemPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className="clearfix mx-2">
            <div className="hint-text">
                Hiển thị <b>{props.itemPerPage}</b> trong <b>{props.totalItem}</b> giá trị
            </div>
            <ul className="pagination">
                <li className={`page-item ${props.currentPage <= 1 ? 'disabled' : ''}`}>
                    <a onClick={() => props.setCurrentPage(props.currentPage - 1)}>
                        <i className="fa fa-angle-left me-2" aria-hidden="true"></i> Trước
                    </a>
                </li>
                {pages.map((page, i) => (
                    <li key={i} className={`page-item ${page === props.currentPage ? 'active' : ''}`}>
                        <a className="page-link" onClick={() => props.setCurrentPage(page)}>
                            {page}
                        </a>
                    </li>
                ))}

                <li className={`page-item ${props.currentPage == pages.length ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={() => props.setCurrentPage(props.currentPage + 1)}>
                        Sau <i className="fa fa-angle-right ms-2" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div>
        // <div className="pagination_rounded">
        //     <ul>
        //         <li>
        //             <a href="#" className="prev">
        //                 {' '}
        //                 <i className="fa fa-angle-left" aria-hidden="true"></i> Prev{' '}
        //             </a>
        //         </li>
        //         {pages.map((page, i) => (
        //             <li className="page-item active" key={i}>
        //                 <a href="#" onClick={()=>props.setCurrentPage(page)}>{page}</a>
        //             </li>
        //         ))}

        //         <li>
        //             <a href="#" className="next">
        //                 {' '}
        //                 Next <i className="fa fa-angle-right" aria-hidden="true"></i>
        //             </a>
        //         </li>
        //     </ul>
        // </div>
    );
}

export default Pagination;
