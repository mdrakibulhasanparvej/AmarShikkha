import { useState } from "react";

const ViewModal = ({ banner }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* View Button */}
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-sm btn-outline"
      >
        View
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full relative p-4">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-sm btn-circle absolute top-2 right-2"
            >
              ✕
            </button>

            {/* Image Preview */}
            <img
              src={banner.image_url}
              alt="Banner"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
