import React from "react";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const CancelPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 p-4 md:p-8 bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">
            Payment Cancelled
          </h2>
          <p className="text-lg mb-6 text-center">
            It seems that the payment was cancelled. If you have any questions,
            please contact us.
          </p>
          <div className="flex justify-center">
            <a
              href="/"
              className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CancelPage;
