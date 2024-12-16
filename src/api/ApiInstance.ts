/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse } from 'axios';

import { APIResponse } from '@/@types';
import { BASE_URL, COMMON_ERROR, SERVER_KEY } from '@/constants/api';
import { getTokenFromAS } from '@/utils/localStorage';

const axios = Axios.create({
  baseURL: BASE_URL,
});

export class API {
  static SerializeResponse<T>(
    response: AxiosResponse<T> | null,
    message: string,
  ): APIResponse<T> {
    const data = response as any;
    if (data.error) {
      throw new Error(message);
    }

    return data;
  }

  static async Post<RQ, RES>(
    url: string,
    payload?: RQ,
    isFormDataType?: boolean,
  ): Promise<APIResponse<RES>> {
    try {
      const headers = this.getHeaders();
      const accessToken = await getTokenFromAS();
      const queryParams = accessToken ? `?access_token=${accessToken}` : '';
      const requestUrl = `${url}${queryParams}`;

      if (payload instanceof FormData && isFormDataType) {
        payload.append('server_key', SERVER_KEY);
      }

      const finalPayload = isFormDataType
        ? payload
        : { ...payload, server_key: SERVER_KEY };
      const res = await axios.post<RES>(requestUrl, finalPayload, {
        headers,
      });
      const response = this.SerializeResponse<RES>(res, '');

      return {
        data: response?.data,
        status: true,
        message: '',
      };
    } catch (error: any) {
      return {
        data: null,
        status: false,
        message:
          error?.response?.data?.errors?.error_text ||
          error?.response?.data?.message ||
          COMMON_ERROR,
      };
    }
  }

  static async Get<RES>(url: string) {
    try {
      const headers = this.getHeaders();
      const res = await axios.get<RES>(url, {
        headers,
      });
      const response = this.SerializeResponse<RES>(res, '');

      return {
        data: response?.data,
        status: true,
        message: '',
      };
    } catch (error: any) {
      return {
        data: null,
        status: false,
        message: error.response?.data?.message || COMMON_ERROR,
      };
    }
  }

  static async Put<RES, REQ = undefined>(
    url: string,
    payload?: REQ,
    isImage?: boolean,
  ) {
    try {
      const headers = this.getHeaders();
      if (isImage) {
        headers['Content-Type'] = 'multipart/form-data';
      }
      const res = await axios.put<RES>(url, payload, {
        headers,
      });
      const response = this.SerializeResponse<RES>(res, '');

      return {
        data: response?.data,
        status: true,
        message: '',
      };
    } catch (error: any) {
      return {
        data: null,
        status: false,
        message: error.response?.data?.message || COMMON_ERROR,
      };
    }
  }

  static async Patch<RES, REQ = undefined>(url: string, payload?: REQ) {
    try {
      const headers = this.getHeaders();
      const res = await axios.patch<RES>(url, payload, {
        headers,
      });
      const response = this.SerializeResponse<RES>(res, '');

      return {
        data: response?.data,
        status: true,
        message: '',
      };
    } catch (error: any) {
      return {
        data: null,
        status: false,
        message: error.response?.data?.message || COMMON_ERROR,
      };
    }
  }

  static async Delete<RES>(url: string) {
    try {
      const headers = this.getHeaders();
      const res = await axios.delete<RES>(url, {
        headers,
      });
      const response = this.SerializeResponse<RES>(res, '');

      return {
        data: response?.data,
        status: true,
        message: '',
      };
    } catch (error: any) {
      return {
        data: null,
        status: false,
        message: error.response?.data?.message || COMMON_ERROR,
      };
    }
  }

  static getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'multipart/form-data',
    };
  }
}
