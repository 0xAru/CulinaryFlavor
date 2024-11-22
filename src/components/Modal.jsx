/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-4 w-96">
          <h2 className="text-xl text-center font-bold mb-6">{title}</h2>
          {children}
          <div className="flex justify-end mt-6 gap-2">
            <button 
              onClick={onClose} 
              className="bg-yellow-600 hover:bg-yellow-800 text-white rounded px-4 py-2"
            >
              Annuler
            </button>
            <button 
              onClick={onConfirm} 
              className="bg-yellow-600 hover:bg-yellow-800 text-white rounded px-4 py-2"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };
export default Modal  