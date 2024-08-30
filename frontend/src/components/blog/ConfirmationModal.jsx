import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-red-600 flex items-center">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="w-6 h-6 mr-2"
            />
            Warning
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          Are you sure you want to submit this blog post? Please ensure that it
          meets all guidelines, as any inappropriate content may result in the
          deletion of your account.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4" />
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
