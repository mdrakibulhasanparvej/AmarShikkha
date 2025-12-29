import React from "react";

const JobholdersTable = ({
  tableRef,
  visibleRows,
  start,
  handleDelete,
  setSelected,
  setOpenView,
  setOpenUpdate,
}) => {
  return (
    <div ref={tableRef} className="overflow-x-auto min-h-70vh max-w-[880px]">
      <table className="table table-md table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Job</th>
            <th>Workplace</th>
            <th>Salary</th>
            <th>Donner</th>
            <th>Added By</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {visibleRows.map((holder, index) => (
            <tr key={holder._id}>
              {/* serial number */}
              <td>{start + index + 1}</td>

              {/* Name + photo */}
              <td className="whitespace-nowrap space-x-2">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-xl overflow-hidden">
                      <img
                        src={holder.photo_URL}
                        className="h-full w-full object-cover"
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{holder.name}</div>
                    <div className="text-xs opacity-80">{holder.gender}</div>
                  </div>
                </div>
              </td>

              {/* Job */}
              <td className="whitespace-nowrap space-x-2">
                <div>
                  <div className="font-medium">{holder.trade}</div>
                  <div className="text-xs opacity-80">{holder.designation}</div>
                </div>
              </td>

              {/* Workplace */}
              <td>
                <div className="font-medium">{holder.workplace}</div>
                <div className="text-xs opacity-80 truncate max-w-[180px]">
                  {holder.address}
                </div>
              </td>

              {/* Salary */}
              <td className="font-semibold whitespace-nowrap space-x-2">
                {Number(holder.salary).toLocaleString()} Tk
              </td>

              {/* Donner */}
              <td>
                <span
                  className={`badge ${
                    holder.donner === "PLANET" ? "badge-success" : "badge-info"
                  }`}
                >
                  {holder.donner}
                </span>
              </td>

              {/* Added by */}
              <td className="text-sm opacity-70">{holder.added_by}</td>

              {/* Date */}
              <td className="text-sm">
                {new Date(holder.created_at).toLocaleDateString()}
              </td>

              {/* Actions */}
              <th className=" flex flex-col items-center justify-center space-x-1 space-y-1">
                <button
                  className="btn w-full btn-info text-white btn-xs"
                  onClick={() => {
                    setSelected(holder);
                    setOpenView(true);
                  }}
                >
                  View
                </button>

                <button
                  className="btn w-full btn-warning text-white btn-xs"
                  onClick={() => {
                    setSelected(holder);
                    setOpenUpdate(true);
                  }}
                >
                  Update
                </button>

                <button
                  className="btn w-full btn-error text-white btn-xs"
                  onClick={() => handleDelete(holder._id)}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>

        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Workplace</th>
            <th>Salary</th>
            <th>Donner</th>
            <th>Added By</th>
            <th>Date</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default JobholdersTable;
