import "./tick.scss";

const Tick = ({ size, type = "sended" }) => {
  return (
    <div
      className={type === "readed" ? "message-tick colored" : "message-tick"}
    >
      <span></span>
      {type !== "sended" ? <span className="double"></span> : ""}
    </div>
  );
};

export default Tick;
