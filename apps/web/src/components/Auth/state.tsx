"use client";

import React, { useContext, useMemo, useReducer } from "react";
import type { IMe } from "@/services/auth";

export const storageKey = "voxl-mini-auth";

export interface IAuthentication {
  isAuthenticated: boolean;
  accessToken: string;
  me: IMe | null;
  bootstrapped: boolean;
}

export interface IAction {
  type: "set_authentication" | "clear_authentication";
  data?: IAuthentication;
}

const EMPTY_AUTH: IAuthentication = {
  isAuthenticated: false,
  accessToken: "",
  me: null,
  bootstrapped: false,
};

export const SET = (data: IAuthentication): IAction => ({
  type: "set_authentication",
  data,
});

export const CLEAR = (): IAction => ({
  type: "clear_authentication",
});

export const GET = (): IAuthentication => {
  if (typeof window === "undefined") return EMPTY_AUTH;

  try {
    const storage = localStorage.getItem(storageKey);
    if (!storage) return EMPTY_AUTH;

    const parsed = JSON.parse(storage) as Partial<IAuthentication>;

    return {
      isAuthenticated: parsed.isAuthenticated ?? false,
      accessToken: parsed.accessToken ?? "",
      me: parsed.me ?? null,
      bootstrapped: parsed.bootstrapped ?? false,
    };
  } catch {
    return EMPTY_AUTH;
  }
};

export const Reducer = (
  data: IAuthentication = EMPTY_AUTH,
  action: IAction
): IAuthentication => {
  switch (action.type) {
    case "set_authentication": {
      const next = action.data ?? EMPTY_AUTH;
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(next));
      }
      return next;
    }

    case "clear_authentication": {
      const next: IAuthentication = {
        ...EMPTY_AUTH,
        bootstrapped: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(next));
      }

      return next;
    }

    default:
      return data;
  }
};

export const Context = React.createContext<{
  data: IAuthentication;
  dispatch: React.Dispatch<IAction>;
}>({
  data: EMPTY_AUTH,
  dispatch: () => {},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [data, dispatch] = useReducer(Reducer, EMPTY_AUTH, GET);

  const value = useMemo(() => ({ data, dispatch }), [data]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const clearAuthentication = () => {
  if (typeof window === "undefined") return;

  const cleared: IAuthentication = {
    ...EMPTY_AUTH,
    bootstrapped: true,
  };

  localStorage.setItem(storageKey, JSON.stringify(cleared));
};

export const getStoredAuthentication = (): IAuthentication => {
  return GET();
};

export const useAuthState = () => {
  const { data, dispatch } = useContext(Context);

  const setAuth = (next: IAuthentication) => dispatch(SET(next));
  const clearAuth = () => dispatch(CLEAR());

  return {
    auth: data,
    me: data.me,
    setAuth,
    clearAuth,
  };
};