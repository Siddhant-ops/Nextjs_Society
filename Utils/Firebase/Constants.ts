const roles = {
  secretary: "SECRETARY",
  member: "MEMBER",
  cMember: "CMEMBER",
  sStaff: "SSTAFF",
  security: "SECURITY",
};

const dbConstants = {
  societyCollection: "SOCIETY",
  usersCollection: "USERS",
  userSubCollection: "Users",
  awaitingUsersSubCollection: "AwaitingUsers",
  referralCode: "referralCode",
};

interface SocietyDoc {
  referralCode: string;
  societyAddress: string;
  societyId: string;
  societyName: string;
  users: [
    {
      id: string;
      role: string;
    }
  ];
}

interface UserSubDoc {
  accountCreated: {
    seconds: number;
    milliseconds: number;
  };
  societyFlatNum: string;
  userEmail: string;
  userName: string;
  userPhoneNum: string;
  userRole: string;
}

interface UserDoc {
  email: string;
  role: string;
  societyDocId: string;
  userId: string;
}

export type { SocietyDoc, UserSubDoc, UserDoc };

export { roles, dbConstants };
