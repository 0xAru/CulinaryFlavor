/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Ne rien rendre si la modale n'est pas ouverte

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-96">
        <button onClick={onClose} className="mt-4 bg-yellow-600 text-white rounded px-4 py-2">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
