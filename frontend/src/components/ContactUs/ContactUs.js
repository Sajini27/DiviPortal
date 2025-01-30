import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/appContext';
import './ContactUs.css';

function ContactUs() {
    const { role } = useContext(AppContext); // Get role from context

    // Officers data, including the in-seat status
    const [officers, setOfficers] = useState([
        { name: 'Mr. B.M.B.M.A.Batugedara', designation: 'Divisional Secretary', phone: '+94 0452262238', fax: '+94 452262239', inSeat: true },
        { name: 'Mr. T.D.Nihal', designation: 'Assistant Divisional Secretary', phone: '+94 0452262238', fax: '', inSeat: false },
        { name: 'Mrs. Chanika Madanasinghe', designation: 'Accountant', phone: '+94 0452263538', fax: '', inSeat: true },
        { name: 'Mrs. C.L.Jayasuriya', designation: 'Deputy Director (Planning)', phone: '+94 0452264292', fax: '+94 0452264292', inSeat: false },
        { name: 'Mrs. P.M.Hettiarachchi', designation: 'Assistant Director (Planning)', phone: '+94 0452264292', fax: '+94 0452264292', inSeat: true },
        { name: 'Mrs. Sujatha Nishshanka', designation: 'Administrative Officer (Grama Niladhari)', phone: '+94 0452262239', fax: '', inSeat: false },
        { name: 'Mr. H.A.C.N.Dharmasena', designation: 'Administrative Officer', phone: '+94 0452262238', fax: '', inSeat: true },
        { name: 'Mrs. D.G.Anoma Damayanthi', designation: 'Additional District Registrar', phone: '+94 0452262239', fax: '', inSeat: true },
    ]);

    // Check if the user is an admin
    const isAdmin = role === 'admin';

    // Toggle the "inSeat" status for an officer (Admin Only)
    const toggleInSeat = (index) => {
        if (!isAdmin) return; // Only admins can modify
        const updatedOfficers = [...officers];
        updatedOfficers[index].inSeat = !updatedOfficers[index].inSeat;
        setOfficers(updatedOfficers);
    };

    return (
        <div className="contact-us-container">
            <h2 className="hotline-title">📞 Hotline: 045 22 62238</h2>
            
            <div className="contact-container">
                <h2>Officers</h2>
                <table className="officer-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Telephone</th>
                            <th>Fax</th>
                            <th>In-Seat</th>
                            {isAdmin && <th>Action</th>} {/* Conditionally render Action column */}
                        </tr>
                    </thead>
                    <tbody>
                        {officers.map((officer, index) => (
                            <tr key={index}>
                                <td>{officer.name}</td>
                                <td>{officer.designation}</td>
                                <td>{officer.phone}</td>
                                <td>{officer.fax || '-'}</td>
                                <td className={officer.inSeat ? 'in-seat-yes' : 'in-seat-no'}>
                                    {officer.inSeat ? 'Yes' : 'No'}
                                </td>
                                {isAdmin && (
                                    <td>
                                        <button className="toggle-button" onClick={() => toggleInSeat(index)}>
                                            {officer.inSeat ? 'Mark as Not In-Seat' : 'Mark as In-Seat'}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContactUs;