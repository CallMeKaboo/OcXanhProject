import React from 'react';
import numeral from 'numeral';

function Money(props) {
    return <>{numeral(props.value).format('0,0')} VNĐ</>;
}

export default Money;
