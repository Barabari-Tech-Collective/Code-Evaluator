"use client";

import { useEffect, useState } from "react";

interface Student {
  name: string;
  studentId: string;
  email: string;
}

interface QR {
  className: string;
  date: string;
}

interface Attendance {
  id: string;
  student: Student;
  qr: QR;
  status: string;
}

export default function AttendancePage() {
  const [collegeId, setCollegeId] = useState<string>("");
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!collegeId) return;

    const fetchAttendance = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/attendance?collegeId=${collegeId}`
      );
      const data = await res.json();
      setAttendance(data.data || []);
      setLoading(false);
    };

    fetchAttendance();
  }, [collegeId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Attendance</h1>

      {/* College Filter */}
      <select
        value={collegeId}
        onChange={(e) => setCollegeId(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">Select College</option>
        <option value="CLG001">Government College A</option>
        <option value="CLG002">Government College B</option>
      </select>

      {/* Table */}
      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Student ID</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{item.student.name}</td>
                  <td className="p-3">{item.student.studentId}</td>
                  <td className="p-3">{item.qr.className}</td>
                  <td className="p-3">
                    {new Date(item.qr.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-green-600 font-medium">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}