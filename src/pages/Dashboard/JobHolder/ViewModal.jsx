import React from "react";

const ViewModal = ({ selected, setOpenView }) => {
  const formatSalary = (amount) => Number(amount).toLocaleString("en-BD");

  const donnerColor =
    selected.donner === "PLANET"
      ? "text-amber-600 font-semibold"
      : "text-green-600 font-semibold";

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-3xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Jobholder Details
        </h3>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={selected.photo_URL}
              alt={selected.name}
              className="w-full max-w-xs h-auto object-contain rounded-lg border"
            />
          </div>

          {/* Right: Info */}
          <div className="md:w-2/3">
            <table className="table w-full text-base">
              <tbody>
                <tr>
                  <th className="py-2">Name</th>
                  <td className="py-2">{selected.name}</td>
                </tr>

                <tr>
                  <th className="py-2">Trade</th>
                  <td className="py-2">{selected.trade}</td>
                </tr>

                <tr>
                  <th className="py-2">Designation</th>
                  <td className="py-2">{selected.designation}</td>
                </tr>

                <tr>
                  <th className="py-2">Workplace</th>
                  <td className="py-2">{selected.workplace}</td>
                </tr>

                <tr>
                  <th className="py-2">Address</th>
                  <td className="py-2">{selected.address}</td>
                </tr>

                <tr>
                  <th className="py-2">Doner</th>
                  <td className={`py-2 ${donnerColor}`}>{selected.donner}</td>
                </tr>

                <tr>
                  <th className="py-2">Salary</th>
                  <td className="py-2 font-medium">
                    {formatSalary(selected.salary)} Tk
                  </td>
                </tr>

                <tr>
                  <th className="py-2">Gender</th>
                  <td className="py-2">{selected.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action mt-8">
          <button
            className="btn btn-outline"
            onClick={() => setOpenView(false)}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ViewModal;
