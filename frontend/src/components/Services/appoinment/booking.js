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

  const [monthSlots, setMonthSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedKeys, setBookedKeys] = useState(new Set());

  const holidayDates = [];

  const formatTime = date => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const getSlotKey = (date, timeStr) => {
    const yyyy = date.getFullYear();
    const M = (date.getMonth() + 1).toString().padStart(2, '0');
    const D = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${M}-${D} ${timeStr}`;
  };
  const isHoliday = useCallback(d => holidayDates.includes(d.toISOString().slice(0, 10)), [holidayDates]);

  const buildMonth = useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const slots = [];

    // Add empty placeholders before the first actual day
    for (let i = 0; i < firstDayOfWeek; i++) {
      slots.push({ placeholder: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dt = new Date(year, month, day);
      const disabled = dt.getDay() === 0 || dt.getDay() === 6 || isHoliday(dt);
      const times = [];

      if (!disabled) {
        const start = new Date(dt); start.setHours(8, 0, 0, 0);
        const end = new Date(dt); end.setHours(16, 0, 0, 0);
        let cur = new Date(start);
        while (cur < end) {
          const t = formatTime(cur);
          times.push({ time: t, slotKey: getSlotKey(dt, t) });
          cur.setMinutes(cur.getMinutes() + 30);
        }
      }

      slots.push({ date: dt, day: dt.getDate(), disabled, times });
    }
    setMonthSlots(slots);
  }, [isHoliday]);

  useEffect(() => { buildMonth(); }, [buildMonth]);

  useEffect(() => {
    if (!officer?._id) return;
    axios.get(`http://localhost:5000/api/user/booked/${officer._id}`)
      .then(({ data }) => {
        const keys = new Set();
        data.bookedSlots.forEach(s => {
          const d = new Date(s);
          keys.add(getSlotKey(d, formatTime(d)));
        });
        setBookedKeys(keys);
      })
      .catch(console.error);
  }, [officer]);

  const handleBook = () => {
    if (selectedDayIndex === null || !selectedTime) return alert('Select a date and time.');
    if (!userId) return alert('Please log in first.');

    const slot = monthSlots[selectedDayIndex];
    const appt = new Date(slot.date);
    const [hh, mm] = selectedTime.split(':');
    appt.setHours(+hh, +mm);

    axios.post('http://localhost:5000/api/user/book', {
      officerId: officer._id,
      date: appt,
      userId
    })
      .then(() => { alert('Booked!'); navigate('/contact'); })
      .catch(err => alert(err.response?.data?.message || 'Booking failed'));
  };

  if (!officer) return <div style={{ marginTop: 100 }}>Officer Not Found</div>;

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="booking-details">
      <h2>{officer.name}</h2>
      <p>{officer.designation}</p>

      <div className="booking-slots">
        <h3>{monthSlots.find(s => !s.placeholder)?.date?.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>

        <div className="weekdays-container">
          {weekdays.map(w => (
            <div key={w} className="weekday-cell">{w}</div>
          ))}
        </div>

        <div className="days-container">
          {monthSlots.map((slot, idx) => (
            slot.placeholder ? (
              <div key={idx} className="day-slot placeholder"></div>
            ) : (
              <div
                key={idx}
                className={`day-slot ${slot.disabled ? 'disabled' : ''} ${selectedDayIndex === idx ? 'selected' : ''}`}
                onClick={() => !slot.disabled && (setSelectedDayIndex(idx), setSelectedTime(null))}
              >{slot.day}</div>
            )
          ))}
        </div>

        <div className="time-slots">
          {selectedDayIndex === null || monthSlots[selectedDayIndex]?.placeholder ? (
            <p>Click a day to view times.</p>
          ) : monthSlots[selectedDayIndex].times.length ? (
            monthSlots[selectedDayIndex].times.map((t, i) => (
              <div
                key={i}
                className={`time-slot ${bookedKeys.has(t.slotKey) ? 'disabled' : ''} ${selectedTime === t.time ? 'selected' : ''}`}
                onClick={() => !bookedKeys.has(t.slotKey) && setSelectedTime(t.time)}
              >
                {t.time}
                {bookedKeys.has(t.slotKey) && <span className="booked-label">Booked</span>}
              </div>
            ))
          ) : (
            <p>No slots on this day.</p>
          )}
        </div>

        <button className="btn-book" onClick={handleBook}>Book Appointment</button>
      </div>
    </div>
  );
}

export default Bookings;
