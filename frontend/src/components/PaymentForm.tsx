import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { showToast } from "../services/Toast";

interface PaymentFormProps {
  token: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ token, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/payment/create-payment-intent",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const clientSecret = response.data;

      const cardElement = elements?.getElement(CardElement);
      if (!stripe || !cardElement) {
        showToast("Stripe not loaded");
        setPaying(false);
        return;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      });

      if (error) {
        showToast("Payment failed: " + error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        showToast("Payment successful!");
        onSuccess();
      }
    } catch (err: any) {
      showToast("Payment error: " + (err?.message || "Unknown error"));
    }
    setPaying(false);
  };

  return (
    <form onSubmit={handlePayment} style={{ marginTop: "1em" }}>
      <CardElement className="stripe-card-element" />
      <button type="submit" disabled={paying || !stripe}>
        {paying ? "Processing..." : "Potwierdź płatność"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={paying}
        style={{ marginLeft: "1em" }}
      >
        Anuluj
      </button>
    </form>
  );
};

export default PaymentForm;