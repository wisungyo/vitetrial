import { useCountdown } from "@/utils/hooks/useCountdown";

type TypeDateTimeDisplay = {
  value: number;
  type: string;
};

type TypeDateDisplay = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type TypeCountdownTimer = {
  targetDate: number;
};

function DateTimeDisplay({ value, type }: TypeDateTimeDisplay) {
  // Convert value to string and split into individual digits
  const digits = value.toString().split("");

  // Add leading zero for single-digit values
  if (digits.length === 1) {
    digits.unshift("0");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex flex-row gap-1">
        {digits.map((digit, index) => (
          <div
            key={index}
            className="px-2 py-6 bg-gray-300 rounded-md w-9 text-center text-lg"
          >
            {digit}
          </div>
        ))}
      </div>
      <span className="text-xs">{type}</span>
    </div>
  );
}

function ShowCounter({ days, hours, minutes, seconds }: TypeDateDisplay) {
  const renderDivider = () => (
    <div className="mt-[20px] font-bold text-gray-300 text-2xl">:</div>
  );

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {days === 0 ? null : (
        <>
          <DateTimeDisplay value={days} type={"Days"} />
          {renderDivider()}
        </>
      )}
      <DateTimeDisplay value={hours} type={"Hours"} />
      {renderDivider()}
      <DateTimeDisplay value={minutes} type={"Minutes"} />
      {renderDivider()}
      <DateTimeDisplay value={seconds} type={"Seconds"} />
    </div>
  );
}

export default function CountdownTimer({ targetDate }: TypeCountdownTimer) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const hasTimeLeft = days + hours + minutes + seconds > 0;

  return (
    <ShowCounter
      {...(hasTimeLeft
        ? { days, hours, minutes, seconds }
        : { days: 0, hours: 0, minutes: 0, seconds: 0 })}
    />
  );
}
