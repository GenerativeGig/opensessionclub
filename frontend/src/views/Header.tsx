import { Link } from "react-router-dom";

export function HeaderView() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Open</h1>
        </Link>
        <Link to="/session/create">
          <button>Create Session</button>
        </Link>
      </header>
    </>
  );
}
