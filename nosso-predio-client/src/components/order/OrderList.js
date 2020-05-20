import React from "react";
import { Link } from "react-router-dom";


const OrderList = (props) => {
  const { orders } = props;
  let statusAvailable = ["Pendente", "Confirmado", "Entregue", "Cancelado"];
  return (
    <div>
      {orders.map((order, idx) => {
      let name = order.origin.name.split(' ')[0];

        return (
          <div key={idx} >
            <Link
              to={`/condominio/${order.service.building}/serviço/${order.service._id}`}
            >
              <div className="card-box order-card"  >
                <img className="card-img" src={order.service.image}  alt='' />
                <div className='card-order-middle'>
                  <h3>{order.service.name}</h3>
                  <h5>Qtd: {order.quantity}</h5>
                </div>
                {/* USER CRIOU  */}
                {props.user.services.some(item => item._id === order.service._id) ? (
                  <div className='card-order-right-side'>
                    <p className='order-by'>Pedido por: {name}</p>

                    {order.status !== "Cancelado" ? (
                      <form
                        onChange={(e) =>
                          props.handleStatus(
                            order.service.building,
                            order.service._id,
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <label className='status-label'>Alterar status: </label>
                        <select className='status-select' name="status">
                          <option value={order.status}>{order.status}</option>
                          {statusAvailable
                            .filter((elem) => elem !== order.status)
                            .map((element, idx) => (
                              <option key={idx} value={element}>
                                {element}
                              </option>
                            ))}
                        </select>
                      </form>
                    ) : (
                      <p>Status: Cancelado</p>
                    )}
                  </div>
                ) : (
                  <div className='card-order-right-side'>
                {/* USER PEDIU */}
                    <p className='status-info'>Status do pedido: {order.status}</p>
                    {order.status === "Cancelado" ? (
                      <></>
                    ) : (
                      <button
                        className='cancel-btn'
                        onClick={(e) =>
                          props.handleStatus(
                            order.service.building,
                            order.service._id,
                            order._id,
                            "Cancelado"
                          )
                        }
                      >
                        Cancelar pedido
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
