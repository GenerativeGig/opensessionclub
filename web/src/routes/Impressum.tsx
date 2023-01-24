import {
  IMPRESSUM_CITY,
  IMPRESSUM_EMAIL,
  IMPRESSUM_HOUSE_NUMBER,
  IMPRESSUM_NAME,
  IMPRESSUM_POSTAL_CODE,
  IMPRESSUM_STREET,
} from "../constants";

export function Impressum() {
  return (
    <article className="p-4">
      <div>{IMPRESSUM_NAME}</div>
      <div>
        {IMPRESSUM_STREET} {IMPRESSUM_HOUSE_NUMBER}
      </div>
      <div>
        {IMPRESSUM_POSTAL_CODE} {IMPRESSUM_CITY}
      </div>
      <br />
      <div>{IMPRESSUM_EMAIL}</div>
    </article>
  );
}

// TODO: Fix Lighthouse issues
// TODO: Make the website a PWA (lighthouse)
