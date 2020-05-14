import React from 'react';

const OrderList = (props) => {
    const {orders} = props;
    return ( 
        <div>
            {
                orders.map((item, idx) => <h1>{item.origin}</h1>)
            }
        </div>
     );
}
 
export default OrderList;