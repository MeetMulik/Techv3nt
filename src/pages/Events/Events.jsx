import { React, useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import eventsabi from "../../utils/eventsabi.json";
import createEventabi from "../../utils/createeventabi.json";
import { ethers } from "ethers";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const getEvents = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x5c4860e038f037Db43d35a563aD1332427b0e4D6",
        createEventabi,
        signer
      );
      const AllEvents = contract.events(10, 0);
      AllEvents.then((result) => {
        setEvents(result);
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    };
    getEvents();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 m-2 items-center justify-center h-[85vh]">
      {events.map((item, index) => (
        <EventCard indivisualevent={item} key={index} />
      ))}
    </div>
  );
};

export default Events;
