import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './booking.css';
import { AppContext } from '../../../context/appContext';

function Bookings() {
  const location = useLocation();
  const officer = location.state;
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();

  const [officerSlots, setOfficerSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedKeys, setBookedKeys] = useState(new Set());

  // Helper to format time as "HH:mm" (24-hour format)
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Helper to get a slot key from a date and time string ("YYYY-MM-DD HH:mm")
  const getSlotKey = (date, timeStr) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${timeStr}`;
  };

  // Memoized function to generate available slots for the next 5 days.
  // Each day includes a list of time slots as objects { time, slotKey }.
  const getAvailableSlots = useCallback(() => {
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set start (8:00 AM) and end (4:00 PM) times for the day
      const startTime = new Date(currentDate);
      startTime.setHours(8, 0, 0, 0);
      const endTime = new Date(currentDate);
      endTime.setHours(16, 0, 0, 0);

      const timeSlots = [];
      let slotTime = new Date(startTime);
      while (slotTime < endTime) {
        const timeStr = formatTime(slotTime);
        const slotKey = getSlotKey(currentDate, timeStr);
        timeSlots.push({ time: timeStr, slotKey });
        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }

      slots.push({
        date: currentDate,
        formattedDate: `${daysOfWeek[(currentDate.getDay() + 6) % 7]} ${currentDate.getDate()}`,
        allTimes: timeSlots,
      });
    }
    setOfficerSlots(slots);
  }, []);

  // Run getAvailableSlots on component mount
  useEffect(() => {
    getAvailableSlots();
  }, [getAvailableSlots]);

  // Fetch booked slots from backend and convert each to a slot key
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/booked/${officer._id}`
        );
        const { bookedSlots } = response.data;
        // Use a Set to store the keys for faster lookup
        const keys = new Set();
        bookedSlots.forEach((slotStr) => {
          const slotDate = new Date(slotStr);
          const timeStr = formatTime(slotDate);
          // Use the date portion of the booking (local time) for the key
          keys.add(getSlotKey(slotDate, timeStr));
        });
        setBookedKeys(keys);
      } catch (error) {
        console.error('Error fetching booked slots:', error.response?.data || error);
      }
    };

    if (officer && officer._id) {
      fetchBookedSlots();
    }
  }, [officer]);

  // Check if a given slot key is booked
  const isTimeBooked = (slotKey) => {
    return bookedKeys.has(slotKey);
  };

  // Handle appointment booking on button click
  const handleAppointmentBooking = async () => {
    if (selectedTime === null) {
      alert('Please select a time slot before booking.');
      return;
    }

    const selectedSlot = officerSlots[selectedDay];
    const appointmentDate = new Date(selectedSlot.date);
    const [hour, minute] = selectedTime.split(':');
    appointmentDate.setHours(parseInt(hour, 10), parseInt(minute, 10));

    if (!userId) {
      alert('User not logged in. Please log in first.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/user/book', {
        officerId: officer._id,
        date: appointmentDate,
        userId: userId,
      });

      alert('Appointment booked successfully!');
      navigate('/contact');
    } catch (error) {
      console.error('Error booking appointment:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to book the appointment.');
    }
  };

  if (!officer) {
    return (
      <div className="officer-details" style={{ marginTop: '100px' }}>
        <h2>Officer Not Found</h2>
        <p>There was an issue loading the officer's details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="booking-details">
      <h2>{officer.name}</h2>
      <p>{officer.designation}</p>

      <div className="booking-slots">
        <h3>Booking Slots</h3>

        <div className="days-container">
          {officerSlots.map((slot, index) => (
            <div
              key={index}
              className={`day-slot ${selectedDay === index ? 'selected' : ''}`}
              onClick={() => {
                setSelectedDay(index);
                setSelectedTime(null);
              }}
            >
              <div>{slot.formattedDate}</div>
            </div>
          ))}
        </div>

        <div className="time-slots">
          {officerSlots[selectedDay]?.allTimes.length > 0 ? (
            officerSlots[selectedDay].allTimes.map(({ time, slotKey }, index) => {
              const booked = isTimeBooked(slotKey);
              return (
                <div
                  key={index}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''} ${booked ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!booked) {
                      setSelectedTime(time);
                    }
                  }}
                >
                  {time}
                  {booked && <span className="booked-label">Booked</span>}
                </div>
              );
            })
          ) : (
            <p className="no-slots">No available slots for this day.</p>
          )}
        </div>

        <button className="btn-book" onClick={handleAppointmentBooking}>
          Book an Appointment
        </button>
      </div>
    </div>
  );
}

export default Bookings;
