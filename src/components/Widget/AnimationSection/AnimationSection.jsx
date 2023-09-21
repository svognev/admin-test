import "./AnimationSection.scss";

export default function AnimationSection({ donation }) {
  if (!donation) {
    return (
      <div className="animationSection">
      </div>
    );
  }

  const { animation, donator, is_good, amount_in_rub } = donation;
  const sum = new Intl.NumberFormat('ru-RU').format(parseInt(amount_in_rub));
  
  return (
    <div className="animationSection">
      <div className="message">
        <h3 className="message-sum">{sum} ₽</h3>
        <h4 className="message-author">{is_good ? donator : "😎😎😎"}</h4>
      </div>
      <div className="animation">
          <img src={`/animations/${animation}.webp`} alt="" />
      </div>
    </div>
  );
}