export interface SessionData {
  id: string;
  user_id: string;
  session_id: string;
  platform: string;
  platform_details: string | null;
  time: string;
  browser: string;
  ip_address: string;
}

export interface GetSessionsResponse {
  api_status: number;
  data: SessionData[];
}

export interface DeleteSessionRequest {
  type: string;
  id: string;
}

export interface DeleteSessionResponse {
  api_status: number;
  message: string;
}
