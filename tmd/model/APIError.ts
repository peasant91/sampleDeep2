/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
export interface APIError extends Error {
  error: ErrorObj;
}

interface ErrorItem {
  title: string;
  message: string;
}

interface ErrorObj {
  code: number;
  title: string;
  errors: ErrorItem[];
}

