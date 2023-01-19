import "./ErrorComp.css";

export default function ErrorComp({ error }) {
  let msg = typeof error === "string" ? error : "something went wrong";
  return <p className="error-text">{msg} *</p>;
}
