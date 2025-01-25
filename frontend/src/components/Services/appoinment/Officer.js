import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function OfficerDetails() {
    const location = useLocation();
    const officer = location.state;

    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

    const [officerSlots, setOfficerSlots] = useState([]);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);

    const getAvailableSlots = async () => {
        const today = new Date();
        const slots = [];

        for (let i = 0; i < 5; i++) { // Adjusted to only include weekdays
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const endTime = new Date(currentDate);
            endTime.setHours(16, 0, 0, 0); // End at 4 PM

            currentDate.setHours(8, 0, 0, 0); // Start at 8 AM

            const timeSlots = [];
            while (currentDate < endTime) {
                timeSlots.push(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            slots.push({
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
                day: daysOfWeek[(today.getDay() + i - 1) % 5],
                times: timeSlots,
            });
        }

        setOfficerSlots(slots);
    };

    useEffect(() => {
        getAvailableSlots();
    }, []);

    if (!officer) {
        return (
            <div className="officer-details text-center" style={{ marginTop: '100px' }}>
                <h2>Officer Not Found</h2>
                <p>It seems there was an issue loading the officer's details. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="officer-details text-center" style={{ marginTop: '50px', padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>{officer.name}</h2>
            <img
                src={officer.image}
                alt={officer.name}
                className="img-fluid"
                style={{ maxWidth: '150px', borderRadius: '50%', marginBottom: '20px' }}
            />
            <p style={{ fontSize: '18px', color: '#555' }}>{officer.role}</p>

            <div className="booking-slots" style={{ marginTop: '30px' }}>
                <h3>Booking Slots</h3>

                <div className="days-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                    {officerSlots.map((slot, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDay(index)}
                            style={{
                                padding: '10px 15px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                backgroundColor: selectedDay === index ? '#4A90E2' : '#f0f0f0',
                                color: selectedDay === index ? '#fff' : '#333',
                                textAlign: 'center',
                                minWidth: '60px',
                            }}
                        >
                            <div>{slot.day}</div>
                            <div>{slot.date.getDate()}</div>
                        </div>
                    ))}
                </div>

                <div className="time-slots" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {officerSlots[selectedDay]?.times.map((time, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedTime(time)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                backgroundColor: selectedTime === time ? '#4A90E2' : '#f0f0f0',
                                color: selectedTime === time ? '#fff' : '#333',
                            }}
                        >
                            {time}
                        </div>
                    ))}
                </div>

                <button
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#4A90E2',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    Book an Appointment
                </button>
            </div>
        </div>
    );
}

export default OfficerDetails;
