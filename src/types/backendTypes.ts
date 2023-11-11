export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  avatar: string;
  role: UserRole;
};

export enum JobStatus {
  INTERVIEW = "INTERVIEW",
  DECLINED = "DECLINED",
  PENDING = "PENDING",
}

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
}

export type Job = {
  id: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};