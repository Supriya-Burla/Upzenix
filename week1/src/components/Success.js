import { useLocation } from "react-router-dom";

function Success() {
  const { state } = useLocation();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Submitted Successfully</h2>

      {state &&
        Object.entries(state).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
    </div>
  );
}

export default Success;
