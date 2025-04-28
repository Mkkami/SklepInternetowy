import { useState } from "react";
import Layout from "../components/Layout";
import CartDiv from "../components/CartDiv";

function Cart() {
  return (
    <Layout>
      <main>
        <h1>Koszyk</h1>
        <CartDiv />
      </main>
    </Layout>
  );
}

export default Cart;
