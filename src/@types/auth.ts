export interface ILoginFields {
  username: string;
  password: string;
  saveLoginInfo?: boolean;
}

export interface ISignupFields {
  username: string;
  email: string;
  birthday: string;
  password: string;
  confirm_password: string;
}

export interface FormValues {
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
}

// Auth API types
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  api_status: number;
  membership: boolean;
  timezone: string;
  user_id: string;
};

export type SignupRequest = {
  username: string;
  email: string;
  birthday: string;
  password: string;
  confirm_password: string;
};

export type SignupResponse = {
  message: string;
};

export type ForgotPasswordRequest = {
  email: string;
  type: string;
  otp?: string;
};

export type ForgotPasswordResponse = {
  message: string;
  api_status: number;
};

export type SetPasswordRequest = {
  email: string;
  otp: string;
  password: string;
};

export type SetPasswordResponse = {
  message: string;
  api_status: number;
};
