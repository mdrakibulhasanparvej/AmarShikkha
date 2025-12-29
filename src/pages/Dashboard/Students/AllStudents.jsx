import React from "react";

const AllStudents = () => {
  // temporary static data (replace with API later)
  const students = [
    {
      name: "Rakib Hasan",
      trade: "Computer",
      batch: "Batch-3",
      phone: "017XXXXXXXX",
      status: "Pending",
      createdAt: "2025-01-10",
    },
    {
      name: "Ayesha Akter",
      trade: "Tailoring",
      batch: "Batch-1",
      phone: "018XXXXXXXX",
      status: "Approved",
      createdAt: "2025-01-12",
    },
  ];

  return (
    <div className="overflow-x-auto h-96">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>#</th>
            <td>Name</td>
            <td>Trade</td>
            <td>Batch</td>
            <td>Phone</td>
            <td>Status</td>
            <td>Applied At</td>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{s.name}</td>
              <td>{s.trade}</td>
              <td>{s.batch}</td>
              <td>{s.phone}</td>
              <td>
                <span
                  className={`badge ${s.status === "Approved" ? "badge-success" : "badge-warning"}`}
                >
                  {s.status}
                </span>
              </td>
              <td>{s.createdAt}</td>
              <th>
                <button className="btn btn-xs btn-info">View</button>
              </th>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th></th>
            <td>Name</td>
            <td>Trade</td>
            <td>Batch</td>
            <td>Phone</td>
            <td>Status</td>
            <td>Applied At</td>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AllStudents;
