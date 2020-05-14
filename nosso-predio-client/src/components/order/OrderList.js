import React from "react";
import { Link } from "react-router-dom";

const OrderList = (props) => {
  const { orders } = props;
  let statusAvailable = ['Pendente', 'Confirmado', 'Entregue', 'Calcelado']
  return (
    <div>
      {orders.map((item, idx) => {
        return (
          <div key={idx} className="building-box">
            <Link to={`/condominio/${props.match.params.id}/serviço/${item.service}`}>
              Acessar produto
            </Link>
            <h3>{item.origin}</h3>
            <h3>{item.quantity}</h3>

            {props.user.services.includes(item.service) ? (
              <form onChange={(e)=>props.handleStatus(props.match.params.id, item.service, item._id, e.target.value)}>
                <label>Status: </label>
                <select name='status'>
                  <option value={item.status}>{item.status}</option>
                  {statusAvailable.filter(elem => elem !== item.status)
                  .map((element, idx) => <option key={idx} value={element}>{element}</option>)
                  }
                </select>
              </form>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
