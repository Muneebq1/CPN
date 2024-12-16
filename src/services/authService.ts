import toast from 'react-hot-toast';

import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  SetPasswordRequest,
  SetPasswordResponse,
  SignupRequest,
} from '@/@types/auth';
import { API } from '@/api/ApiInstance';
import { CPN, REST_SUB_URL } from '@/constants/api';

export const loginUser = async (payload: LoginRequest) => {
  const response = await API.Post<LoginRequest, LoginResponse>(
    `${CPN}${REST_SUB_URL.LOGIN}`,
    payload,
  );
  if (response.data?.api_status === 200) return response.data;

  toast.error(response.message);

  return;
};

export const signupUser = async (payload: SignupRequest) => {
  const response = await API.Post<
    SignupRequest,
    Omit<LoginResponse, 'timezone'>
  >(`${CPN}${REST_SUB_URL.SIGNUP}`, payload);
  if (response.data?.api_status === 200) return response.data;
  toast.error(response.message);
  return;
};

export const forgotPassword = async (payload: ForgotPasswordRequest) => {
  const response = await API.Post<
    ForgotPasswordRequest,
    ForgotPasswordResponse
  >(`${CPN}${REST_SUB_URL.OTP}`, payload);
  if (response.data?.api_status === 200) return response.data;

  toast.error(response.message);

  return;
};

export const setNewPassword = async (payload: SetPasswordRequest) => {
  const response = await API.Post<SetPasswordRequest, SetPasswordResponse>(
    `${CPN}${REST_SUB_URL.SET_PASSWORD}`,
    payload,
  );
  if (response?.data?.api_status === 200) return response.data;

  toast.error(response.message);

  return;
};
