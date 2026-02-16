export const DASHBOARD_DOMAIN_DATA = [
  { x: "HTML", y: 72 },
  { x: "CSS", y: 68 },
  { x: "JavaScript", y: 81 },
  { x: "React", y: 77 },
  { x: "Backend", y: 70 },
];

export const STUDENT_PROGRESS_DATA = [
  { x: "Assignment 1", y: 65 },
  { x: "Assignment 2", y: 72 },
  { x: "Assignment 3", y: 80 },
  { x: "Assignment 4", y: 88 },
];

export const COLLEGE_COMPARISON_DATA = [
  { x: "City College", y: 78 },
  { x: "Begumpet", y: 72 },
  { x: "HussainiAlam", y: 69 },
];

export const DOMAIN_ASSIGNMENT_DATA = {
  HTML: [
    { x: "Assignment 1", y: 70 },
    { x: "Assignment 2", y: 75 },
    { x: "Assignment 3", y: 78 },
  ],
  CSS: [
    { x: "Assignment 1", y: 68 },
    { x: "Assignment 2", y: 72 },
    { x: "Assignment 3", y: 74 },
  ],
  JavaScript: [
    { x: "Assignment 1", y: 65 },
    { x: "Assignment 2", y: 72 },
    { x: "Assignment 3", y: 81 },
    { x: "Assignment 4", y: 88 },
  ],
};

export const RUBRIC_BREAKDOWN_DATA = [
  { x: "Logic", y: 8 },
  { x: "Syntax", y: 7 },
  { x: "Edge Cases", y: 6 },
  { x: "Code Quality", y: 8 },
];

export const PEER_ASSIGNMENT_DATA = [
  { x: "Asiya", y: 82 },
  { x: "Rahul", y: 74 },
  { x: "Aman", y: 69 },
];

export const MULTI_STUDENT_TREND_DATA = [
  { x: "Assignment 1", Asiya: 70, Rahul: 65 },
  { x: "Assignment 2", Asiya: 78, Rahul: 72 },
  { x: "Assignment 3", Asiya: 85, Rahul: 80 },
];
export const STUDENT_DOMAIN_RADAR_DATA = [
  { x: "HTML", y: 75 },
  { x: "CSS", y: 70 },
  { x: "JavaScript", y: 82 },
  { x: "React", y: 78 },
  { x: "Backend", y: 68 },
];
export const DOMAIN_PEER_COMPARISON_DATA = [
  { x: "Asiya", y: 80 },
  { x: "Rahul", y: 74 },
  { x: "Aman", y: 71 },
];

// Student vs Class Average (Domain-wise)
export const STUDENT_VS_CLASS_DATA = [
  { x: "HTML", student: 72, average: 68 },
  { x: "CSS", student: 70, average: 66 },
  { x: "JavaScript", student: 82, average: 74 },
  { x: "React", student: 78, average: 70 },
  { x: "Backend", student: 65, average: 60 },
];

// Radar – Skill Profile
export const STUDENT_RADAR_DATA = [
  { x: "HTML", y: 72 },
  { x: "CSS", y: 70 },
  { x: "JavaScript", y: 82 },
  { x: "React", y: 78 },
  { x: "Backend", y: 65 },
];

// export const BATCH_ASSIGNMENT_COMPARISON = {
//   JavaScript: {  
//     "Assignment 1": [
//       { student: "Asiya", score: 82 },
//       { student: "Rahul", score: 74 },
//       { student: "Aman", score: 69 },
//     ],
//   },
// };

// export const BATCH_MULTI_ASSIGNMENT_TREND = {
//   JavaScript: [
//     { assignment: "A1", Asiya: 70, Rahul: 65, Aman: 60 },
//     { assignment: "A2", Asiya: 78, Rahul: 72, Aman: 68 },
//     { assignment: "A3", Asiya: 85, Rahul: 80, Aman: 75 },
//   ],
// };

// export const DOMAIN_NORMALIZED_BATCH = {
//   JavaScript: [
//     { student: "Asiya", score: 80 },
//     { student: "Rahul", score: 74 },
//     { student: "Aman", score: 71 },
//   ],
// };

// ===============================
// BATCH ASSIGNMENT COMPARISON
// Multiple Students → Same Assignment
// ===============================

export const BATCH_ASSIGNMENT_COMPARISON = {
  HTML: {
    "Assignment 1": [
      { student: "Asiya", score: 75 },
      { student: "Rahul", score: 68 },
      { student: "Aman", score: 72 },
    ],
    "Assignment 2": [
      { student: "Asiya", score: 78 },
      { student: "Rahul", score: 70 },
      { student: "Aman", score: 74 },
    ],
  },

  CSS: {
    "Assignment 1": [
      { student: "Asiya", score: 70 },
      { student: "Rahul", score: 66 },
      { student: "Aman", score: 69 },
    ],
    "Assignment 2": [
      { student: "Asiya", score: 74 },
      { student: "Rahul", score: 71 },
      { student: "Aman", score: 73 },
    ],
  },

  JavaScript: {
    "Assignment 1": [
      { student: "Asiya", score: 82 },
      { student: "Rahul", score: 74 },
      { student: "Aman", score: 69 },
    ],
    "Assignment 2": [
      { student: "Asiya", score: 88 },
      { student: "Rahul", score: 80 },
      { student: "Aman", score: 76 },
    ],
    "Assignment 3": [
      { student: "Asiya", score: 90 },
      { student: "Rahul", score: 84 },
      { student: "Aman", score: 79 },
    ],
  },

  React: {
    "Assignment 1": [
      { student: "Asiya", score: 79 },
      { student: "Rahul", score: 73 },
      { student: "Aman", score: 76 },
    ],
  },

  Backend: {
    "Assignment 1": [
      { student: "Asiya", score: 68 },
      { student: "Rahul", score: 64 },
      { student: "Aman", score: 66 },
    ],
  },
};

// ===============================
// Multiple Students → Multiple Assignments
// ===============================

export const BATCH_MULTI_ASSIGNMENT_TREND = {
  HTML: [
    { assignment: "Assignment 1", Asiya: 70, Rahul: 65, Aman: 68 },
    { assignment: "Assignment 2", Asiya: 78, Rahul: 72, Aman: 74 },
    { assignment: "Assignment 3", Asiya: 85, Rahul: 80, Aman: 82 },
  ],

  CSS: [
    { assignment: "Assignment 1", Asiya: 68, Rahul: 64, Aman: 66 },
    { assignment: "Assignment 2", Asiya: 72, Rahul: 69, Aman: 71 },
    { assignment: "Assignment 3", Asiya: 75, Rahul: 73, Aman: 74 },
  ],

  JavaScript: [
    { assignment: "Assignment 1", Asiya: 70, Rahul: 65, Aman: 60 },
    { assignment: "Assignment 2", Asiya: 78, Rahul: 72, Aman: 68 },
    { assignment: "Assignment 3", Asiya: 85, Rahul: 80, Aman: 75 },
    { assignment: "Assignment 4", Asiya: 92, Rahul: 86, Aman: 82 },
  ],

  React: [
    { assignment: "Assignment 1", Asiya: 75, Rahul: 70, Aman: 72 },
    { assignment: "Assignment 2", Asiya: 80, Rahul: 76, Aman: 78 },
  ],

  Backend: [
    { assignment: "Assignment 1", Asiya: 65, Rahul: 60, Aman: 62 },
    { assignment: "Assignment 2", Asiya: 70, Rahul: 66, Aman: 68 },
  ],
};

// ===============================
// Multiple Students → Single Domain (Normalized)
// ===============================

export const DOMAIN_NORMALIZED_BATCH = {
  HTML: [
    { student: "Asiya", score: 78 },
    { student: "Rahul", score: 72 },
    { student: "Aman", score: 74 },
  ],

  CSS: [
    { student: "Asiya", score: 75 },
    { student: "Rahul", score: 71 },
    { student: "Aman", score: 73 },
  ],

  JavaScript: [
    { student: "Asiya", score: 88 },
    { student: "Rahul", score: 82 },
    { student: "Aman", score: 79 },
  ],

  React: [
    { student: "Asiya", score: 81 },
    { student: "Rahul", score: 76 },
    { student: "Aman", score: 78 },
  ],

  Backend: [
    { student: "Asiya", score: 72 },
    { student: "Rahul", score: 68 },
    { student: "Aman", score: 70 },
  ],
};

// ===== College → Domain → Assignments (Case 7)
export const COLLEGE_DOMAIN_ASSIGNMENT_DATA = {
  "City College": {
    JavaScript: [
      { x: "Assignment 1", y: 78 },
      { x: "Assignment 2", y: 82 },
      { x: "Assignment 3", y: 85 },
    ],
    HTML: [
      { x: "Assignment 1", y: 70 },
      { x: "Assignment 2", y: 75 },
    ],
    CSS: [
      { x: "Assignment 1", y: 68 },
      { x: "Assignment 2", y: 72 },
      { x: "Assignment 3", y: 55 },
    ]
  },
  Begumpet: {
    JavaScript: [
      { x: "Assignment 1", y: 72 },
      { x: "Assignment 2", y: 74 },
    ],
      CSS: [
      { x: "Assignment 1", y: 68 },
      { x: "Assignment 2", y: 72 },
      { x: "Assignment 3", y: 55 },
    ],
    React: [
      { x: "Assignment 1", y: 70 },
      { x: "Assignment 2", y: 86 },
      { x: "Assignment 3", y: 50 },
    ]
  },
  HussainiAlam: {
    JavaScript: [
      { x: "Assignment 1", y: 72 },
      { x: "Assignment 2", y: 74 },
    ],
      CSS: [
      { x: "Assignment 1", y: 68 },
      { x: "Assignment 2", y: 72 },
      { x: "Assignment 3", y: 55 },
    ],
    React: [
      { x: "Assignment 1", y: 70 },
      { x: "Assignment 2", y: 86 },
      { x: "Assignment 3", y: 50 },
    ],
    HTML: [
      { x: "Assignment 1", y: 70 },
      { x: "Assignment 2", y: 75 },
      { x: "Assignment 3", y: 78 },
    ]
  },
};

// ===== Cross College → Same Domain (Case 8)
export const CROSS_COLLEGE_DOMAIN_DATA = {
  JavaScript: [
    { x: "City College", y: 82 },
    { x: "Begumpet", y: 74 },
    { x: "HussainiAlam", y: 71 },
  ],
  HTML: [
    { x: "City College", y: 75 },
    { x: "Begumpet", y: 70 },
    { x: "HussainiAlam", y: 68 },
  ],
  React: [
    { x: "City College", y: 80 },
    { x: "Begumpet", y: 90 },
    { x: "HussainiAlam", y: 60 },
  ],
};

// ===== College → Multiple Domains (Case 9)
export const COLLEGE_DOMAIN_OVERVIEW = {
  "City College": [
    { x: "HTML", y: 75 },
    { x: "CSS", y: 72 },
    { x: "JavaScript", y: 82 },
    { x: "React", y: 79 },
    { x: "Backend", y: 70 },
  ],
  Begumpet: [
    { x: "HTML", y: 70 },
    { x: "CSS", y: 68 },
    { x: "JavaScript", y: 74 },
    { x: "React", y: 71 },
  ],
  HussainiAlam: [
    { x: "HTML", y: 68 },
    { x: "CSS", y: 65 },
    { x: "JavaScript", y: 70 },
    { x: "React", y: 68 },
  ],
};
export const STUDENT_DATA_BY_NAME = {
  "Asiya": {
    class: [
      { domain: "JS", student: 85, class: 70 },
      { domain: "React", student: 80, class: 72 },
      { domain: "Backend", student: 65, class: 68 },
    ],
    radar: [
      { skill: "HTML CSS", value: 85 },
      { skill: "JavaScript", value: 78 },
      { skill: "React", value: 72 },
      { skill: "Backend", value: 88 },
      { skill: "DSA", value: 80 },
    ],
    insights: {
      strong: "JavaScript",
      weak: "Backend",
      // consistency: "High",
    },
  },

  "Rahul Verma": {
    class: [
      { domain: "JS", student: 70, class: 70 },
      { domain: "React", student: 68, class: 72 },
      { domain: "Backend", student: 75, class: 68 },
    ],
    radar: [
      { skill: "Html Css", value: 50 },
      { skill: "JavaScript", value: 75 },
      { skill: "Backend", value: 60 },
      { skill: "React", value: 80 },
      { skill: "DSA", value: 75},
    ],
    insights: {
      strong: "JavaScript",
      weak: "React",
      // consistency: "Medium",
    },
  },

  "Aman Ali": {
    class: [
      { domain: "JS", student: 60, class: 70 },
      { domain: "React", student: 58, class: 72 },
      { domain: "Backend", student: 55, class: 68 },
    ],
    radar: [
      { skill: "Html Css", value: 60 },
      { skill: "JavaScript", value: 55 },
      { skill: "Backend", value: 50 },
      { skill: "React", value: 65 },
      { skill: "DSA", value: 75},
    ],
    insights: {
      strong: "JavaScript",
      weak: "Backend",
      // consistency: "Low",
    },
  },
};

export const STUDENT_LIST = Object.keys(STUDENT_DATA_BY_NAME);

