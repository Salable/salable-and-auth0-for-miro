import DateTimeDisplay from "./DateTimeDisplay";
import useCountDown from "./useCountDown";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  );
};

const CountDownTimer = ({ targetDate, textLabel }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <div>
        <h3><center>{textLabel}</center></h3>
      <ShowCounter
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />        
      </div>
      
    );
  }
};

export default CountDownTimer;