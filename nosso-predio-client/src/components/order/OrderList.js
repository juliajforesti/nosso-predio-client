import React from "react";
import { Link } from "react-router-dom";

const OrderList = (props) => {
  const { orders } = props;
  let statusAvailable = ["Pendente", "Confirmado", "Entregue", "Calcelado"];
  return (
    <div>
      {orders.map((order, idx) => {
        return (
          <div key={idx} className="building-box">
            <Link
              to={`/condominio/${order.service.building}/serviço/${order.service._id}`}
            >
            <h3>{order.service.name}</h3>
            </Link>
            <h3>Quantidade: {order.quantity}</h3>

            {/* USER QUE CRIOU O SERVIÇO? */}
            {props.user.services.includes(order.service._id) ? (
              <div>
              <p>Pedido por: {order.origin.name}</p>

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
              </div>
            ) : (
              <div>
                <p>Status do pedido: {order.status}</p>
                {order.status === "Cancelado" ? (
                  <></>
                ) : (
                  <button
                    onClick={(e) =>
                      props.handleStatus(
                        order.service.building,
                        order.service._id,
                        order._id,
                        "Cancelado"
                      )}
                  >
                    Cancelar pedido
                  </button>
                )
                }
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
