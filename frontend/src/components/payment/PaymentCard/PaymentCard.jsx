import React from "react";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { loadStripe } from "@stripe/stripe-js";

const PaymentCard = () => {
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PrjPYJbBBmYb7W02Yue1Nld3wQTOIAVILslfMTuX94Jc2inT3y7f5H8hcyjDgkrXxcRMNuSZXfqbIyyLtxm2YqJ00oXYLFxoO"
    );
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `http://localhost:3000/api/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 p-4 md:p-8 bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            Support WriteNest
          </h2>
          <p className="text-lg mb-6 text-center">
            Thank you for using WriteNest! If you appreciate the platform and
            want to support its development, consider donating to us. Your
            support helps us continue to improve and add new features.
          </p>
          <p className="text-left text-gray-600 mb-6">
            <strong>Note:</strong> This is a <strong>fake payment</strong> for
            testing purposes only. Use the following test card details:
            <ul className="list-disc list-inside mt-4">
              <li>
                <strong>Card Number:</strong> 4242 4242 4242 4242
              </li>
              <li>
                <strong>Expiration Date:</strong> Any future date
              </li>
              <li>
                <strong>CVC:</strong> Any 3 digits
              </li>
            </ul>
          </p>
          <div className="flex justify-center">
            <button
              onClick={makePayment}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            >
              Proceed to Payment
              <i className="fa-solid fa-money-check-dollar ml-2"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentCard;
