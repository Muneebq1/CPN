import toast from 'react-hot-toast';

import {
  DeleteSessionRequest,
  DeleteSessionResponse,
  GetSessionsResponse,
  SessionData,
} from '@/@types/manageSessions';
import { API } from '@/api/ApiInstance';
import { CPN, REST_SUB_URL } from '@/constants/api';
import { MANAGE_SESSIONS_TEXT } from '@/constants/manageSessions';

export const getAllSessions = async (): Promise<SessionData[] | null> => {
  const response = await API.Post<{ type: string }, GetSessionsResponse>(
    `${CPN}${REST_SUB_URL.SESSIONS}`,
    { type: 'get' },
  );
  if (response.data?.api_status === 200) {
    return response.data.data;
  }
  toast.error(MANAGE_SESSIONS_TEXT.errorFetch);

  return null;
};

export const deleteSession = async (
  payload: DeleteSessionRequest,
): Promise<boolean> => {
  const response = await API.Post<DeleteSessionRequest, DeleteSessionResponse>(
    `${CPN}${REST_SUB_URL.SESSIONS}`,
    payload,
  );
  if (response.data?.api_status === 200) {
    toast.success(response.data.message);
    return true;
  }
  toast.error(MANAGE_SESSIONS_TEXT.errorDelete);

  return false;
};
