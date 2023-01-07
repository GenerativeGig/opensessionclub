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
    <div className="p-4">
      <div>{IMPRESSUM_NAME}</div>
      <div>
        {IMPRESSUM_STREET} {IMPRESSUM_HOUSE_NUMBER}
      </div>
      <div>
        {IMPRESSUM_POSTAL_CODE} {IMPRESSUM_CITY}
      </div>
      <br />
      <div>{IMPRESSUM_EMAIL}</div>
    </div>
  );
}

// TODO MUST: Remove who is privacy for opensession.club and opensessionclub.com
// TODO MUST: email
// (with email address: info@opensession.club (/info@opensessionclub.com as redirect)),
