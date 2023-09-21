import { useEffect, useState, useRef } from "react";
import useWebSocket from "common/useWebSocket";

import GoalLine from "components/Widget/GoalLine";
import AnimationSection from "components/Widget/AnimationSection";

import "./WidgetPage.scss";

const wait = async (timeout) => new Promise(res => setTimeout(() => res(), timeout));

export default function WidgetPage({ goal, updateGoal }) {
  const [isShowing, setIsShowingState] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [donatesToShow, setDonatesToShow] = useState([]);
  const isShowingRef = useRef(false);

  const setIsShowing = (val) => {
    setIsShowingState(val);
    isShowingRef.current = val;
  };

  const showDonation = async (donation) => {
    if (isShowingRef.current) {
      setDonatesToShow((prevState) => ([ ...prevState, donation ]));
    } else {
      setDonatesToShow((prevState) => prevState.filter(({ id }) => id !== donation.id));
      setIsShowing(true);
      setCurrentDonation(donation);

      if (!donation.is_resent) {
        updateGoal(donation.amount_in_rub);
      }
  
      await wait(5000);
      setCurrentDonation(null);
      await wait(500);
      setIsShowing(false);
    }
  }

  useWebSocket(`goal/${goal.id}`, showDonation);

  useEffect(() => {
    if (!isShowing && donatesToShow.length) {
      showDonation(donatesToShow[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowing]);

  return (
    <div className="widgetPage">
      <AnimationSection donation={currentDonation} />
      <GoalLine title={goal.name} maxLimit={goal.max_limit} current={goal.current} />
    </div>
  );
}
