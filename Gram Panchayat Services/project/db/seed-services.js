const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.sqlite");

const services = [
  {
    name: "Birth Certificate",
    description:
      "Apply for a new birth certificate or get a copy of an existing one",
    requirements:
      "1. Parent's ID proof\n2. Hospital birth record\n3. Address proof\n4. Affidavit if delayed registration",
  },
  {
    name: "Death Certificate",
    description: "Register a death or obtain a death certificate copy",
    requirements:
      "1. Hospital death record\n2. Deceased's Aadhaar card\n3. Address proof\n4. Applicant's ID proof",
  },
  {
    name: "Income Certificate",
    description: "Get income certificate for various government schemes",
    requirements:
      "1. Salary slips/Income proof\n2. Bank statements\n3. ID proof\n4. Address proof",
  },
  {
    name: "Property Tax Payment",
    description: "Pay your property tax online or get payment history",
    requirements:
      "1. Property documents\n2. Previous tax receipts\n3. Owner's ID proof",
  },
  {
    name: "Building Permission",
    description: "Apply for construction or renovation permits",
    requirements:
      "1. Land documents\n2. Building plan\n3. NOC from neighbors\n4. Technical drawings",
  },
  {
    name: "Water Connection",
    description: "Apply for new water connection or transfer existing one",
    requirements:
      "1. Property documents\n2. ID proof\n3. Previous bills (for transfer)\n4. NOC from owner",
  },
  {
    name: "Marriage Registration",
    description: "Register marriage and obtain certificate",
    requirements:
      "1. Photos of couple\n2. Age proof\n3. Residence proof\n4. Witness details",
  },
  {
    name: "Trade License",
    description: "Apply for new trade license or renew existing one",
    requirements:
      "1. Shop documents\n2. ID proof\n3. Business details\n4. NOC from owner",
  },
  {
    name: "Residence Certificate",
    description: "Obtain proof of residence certificate",
    requirements:
      "1. Address proof\n2. ID proof\n3. Passport size photos\n4. Previous bills",
  },
  {
    name: "Pension Scheme",
    description: "Apply for various pension schemes for elderly",
    requirements:
      "1. Age proof\n2. Income certificate\n3. Bank account details\n4. Address proof",
  },
  {
    name: "Driving License",
    description: "Apply for a new driving license or renew an existing one",
    requirements:
      "1. Age proof\n2. Residence proof\n3. Medical certificate\n4. Driving test report",
  },
  {
    name: "Voter ID Registration",
    description: "Register for a new voter ID or update existing details",
    requirements:
      "1. Age proof\n2. Address proof\n3. Passport size photos\n4. Existing voter ID (if updating)",
  },
  {
    name: "Aadhaar Enrollment",
    description: "Enroll for a new Aadhaar card or update details",
    requirements:
      "1. ID proof\n2. Address proof\n3. Biometric data\n4. Passport size photos",
  },
  {
    name: "Electricity Connection",
    description:
      "Apply for a new electricity connection or transfer existing one",
    requirements:
      "1. Property documents\n2. ID proof\n3. Previous bills (for transfer)\n4. NOC from owner",
  },
  {
    name: "Passport Application",
    description: "Apply for a new passport or renew an existing one",
    requirements:
      "1. ID proof\n2. Address proof\n3. Passport size photos\n4. Previous passport (if renewing)",
  },
  {
    name: "Scholarship Application",
    description: "Apply for various educational scholarships",
    requirements:
      "1. Academic records\n2. Income proof\n3. ID proof\n4. Address proof",
  },
  {
    name: "Business Registration",
    description: "Register a new business or update details of an existing one",
    requirements:
      "1. Business plan\n2. ID proof\n3. Address proof\n4. NOC from local authorities",
  },
  {
    name: "Waste Management Services",
    description: "Schedule waste pickup or report issues",
    requirements:
      "1. Address proof\n2. ID proof\n3. Waste type details\n4. Service application form",
  },
  {
    name: "Health Insurance Enrollment",
    description: "Enroll in a government health insurance scheme",
    requirements:
      "1. ID proof\n2. Income proof\n3. Medical history\n4. Address proof",
  },
  {
    name: "Transport Permit",
    description: "Apply for a new transport permit or renew an existing one",
    requirements:
      "1. Vehicle documents\n2. ID proof\n3. Address proof\n4. Previous permit (if renewing)",
  },
];

db.serialize(() => {
  const stmt = db.prepare(
    "INSERT INTO services (name, description, requirements) VALUES (?, ?, ?)"
  );

  services.forEach((service) => {
    stmt.run(service.name, service.description, service.requirements);
  });

  stmt.finalize();

  console.log("Services seeded successfully");
  db.close();
});
