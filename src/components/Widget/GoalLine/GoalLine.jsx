import "./GoalLine.scss";

export default function GoalLine({ title, maxLimit, current }) {
  const currentPercentage = Math.floor(current / maxLimit * 100);
  const currentIndicatorStyles = { width: `${currentPercentage}%` };
  const formattedMaxLimit = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(parseInt(maxLimit));
  const formattedCurrent = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(parseInt(current));

  return (
    <div className="goalLine">
      <h1 className="goalLine-title">{title}</h1>
      <div className="goalLine-line">
        <div className="goalLine-currentIndicator" style={currentIndicatorStyles} />
        <div className="goalLine-sums">
          <h3 className="goalLine-sum goalLine-sum_start">0 ₽</h3>
          <h3 className="goalLine-sum goalLine-sum_current">{formattedCurrent} ₽</h3>
          <h3 className="goalLine-sum goalLine-sum_max">{formattedMaxLimit} ₽</h3>
        </div>
      </div>
    </div>
  );
}