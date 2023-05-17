import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

//syled comp
const SuccessDiv = styled.div`
  background-image: url("https://source.unsplash.com/VJ4pn_PSBLo");
  width: 100vw;
  height: 100vh;
`;

const Success = () => {
  const location = useLocation();
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);

  console.log(location);
  const data = cart.stripeData;
  const [loading, setLoading] = useState(true);
  // const cart = location.state.products;
  const user = useSelector((state) => state.user);

  const [orderId, setOrderId] = useState(null);

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(
          "https://mythu-ecommerce-app.onrender.com/order",
          {
            userId: user.currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              productName: item.name,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          },
          {
            headers: {
              token: user.currentUser.token,
            },
          }
        );
        setLoading(false);
        setOrderId(res.data.insertedId);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    data && createOrder();
    // eslint-disable-next-line
  }, [cart, data]);

  return (
    <SuccessDiv>
      {loading ? (
        <Loader type="TailSpin" color="#25283D" height={100} width={100} />
      ) : (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header>
            <Modal.Title>Your Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {orderId
              ? `Order has been created successfully. Your order number is ${orderId}`
              : `Successfull. Your order is being prepared...`}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => history("/")}
              style={{ padding: 10, marginTop: 20 }}
            >
              Home
            </Button>
            <Button
              className="bg-success"
              onClick={() => history("/order")}
              style={{ padding: 10, marginTop: 20 }}
            >
              Orders
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </SuccessDiv>
  );
};

export default Success;
