export const IS_PRODUCTION: boolean = import.meta.env.PROD;

export const DISCORD_AUTH_URL: string | undefined = import.meta.env
  .VITE_DISCORD_AUTH_URL;

export const IMPRESSUM_NAME: string | undefined = import.meta.env
  .VITE_IMPRESSUM_NAME;
export const IMPRESSUM_STREET: string | undefined = import.meta.env
  .VITE_IMPRESSUM_STREET;
export const IMPRESSUM_HOUSE_NUMBER: string | undefined = import.meta.env
  .VITE_IMPRESSUM_HOUSE_NUMBER;
export const IMPRESSUM_POSTAL_CODE: string | undefined = import.meta.env
  .VITE_IMPRESSUM_POSTAL_CODE;
export const IMPRESSUM_CITY: string | undefined = import.meta.env
  .VITE_IMPRESSUM_CITY;
export const IMPRESSUM_EMAIL: string | undefined = import.meta.env
  .VITE_IMPRESSUM_EMAIL;
