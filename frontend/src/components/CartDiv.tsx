import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartDivBody from "./CartDivBody";

const stripePromise = loadStripe("pk_test_51RRX2ZFl2le9G44BDRkqFfPVTZyT6nhTHytV2319oyMRs5UfKfJNoBWVmbzRj2hNz19A1LlBeByqpCWEnx558o8D00JRA6PJuj");

const CartDiv: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CartDivBody />
  </Elements>
);

export default CartDiv;