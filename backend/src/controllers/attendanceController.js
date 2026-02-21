import axios from "axios";

export const getAttendance = async (req, res) => {
  try {
    const { collegeId } = req.query;

    if (!collegeId) {
      return res.status(400).json({ error: "collegeId required" });
    }

    const response = await axios.get(
      `${process.env.ATTENDANCE_SERVICE_URL}/api/attendance`,
      {
        params: { collegeId }
      }
    );

    return res.json(response.data);

  } catch (error) {
    console.error("DISHA ATTENDANCE ERROR:", error.message);
    return res.status(500).json({ error: "Failed to fetch attendance" });
  }
};