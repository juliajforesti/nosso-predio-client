import React from "react";
import { Link } from "react-router-dom";
import '../user/User.css'



const OrderList = (props) => {
  const { orders } = props;
  let statusAvailable = ["Pendente", "Confirmado", "Entregue", "Cancelado"];
  return (
    <div>
      {orders.map((order, idx) => {
        return (
          <div key={idx} >
            <Link
              to={`/condominio/${order.service.building}/serviço/${order.service._id}`}
            >
              <div className="card-box order-card"  >
                <img className="card-img" src={order.service.image}  alt='' />
                <div>
                  <h3>{order.service.name}</h3>
                  <h5>Qtd: {order.quantity}</h5>
                </div>
                {/* USER CRIOU  */}
                {props.user.services.includes(order.service._id) ? (
                  <div className='card-order-right-side'>
                    <p>Pedido por: {order.origin.name}</p>
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
                        <label>Status: </label>
                        <select name="status">
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
