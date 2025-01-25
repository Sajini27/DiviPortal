import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointment.css';
import officer1 from '../../../assets/officer1.jpg';
import officer2 from '../../../assets/officer2.jpg';
import officer3 from '../../../assets/officer3.jpg';
import officer4 from '../../../assets/officer4.jpg';
import officer5 from '../../../assets/officer5.jfif';
import officer6 from '../../../assets/officer6.jfif';
import officer7 from '../../../assets/officer7.jfif';
import officer8 from '../../../assets/officer8.jpeg';

function AppointmentBooking() {
    const navigate = useNavigate();

    // Function to handle navigation
    const handleImageClick = (officer) => {
        navigate(`/officer/${officer.id}`, { state: officer });
    };

    const officers = [
        { id: "officer1", image: officer1, name: "Mr. B.M.B.M.A.Batugedara", role: "Divisional Secretary" },
        { id: "officer2", image: officer2, name: "Mr. T.D.Nihal", role: "Assistant Divisional Secretary" },
        { id: "officer3", image: officer3, name: "Mrs. Chanika Madanasinghe", role: "Accountant" },
        { id: "officer4", image: officer4, name: "Mrs. C.L.Jayasuriya", role: "Deputy Director (Planning)" },
        { id: "officer5", image: officer5, name: "Mrs. P.M.Hettiarachchi", role: "Assistant Director (Planning)" },
        { id: "officer6", image: officer6, name: "Mrs. Sujatha Nishshanka", role: "Administrative Officer (Grama Niladhari)" },
        { id: "officer7", image: officer7, name: "Mr. H.A.C.N.Dharmasena", role: "Administrative Officer" },
        { id: "officer8", image: officer8, name: "Mrs. D.G.Anoma Damayanthi", role: "Additional District Registrar" },
    ];

    return (
        <div>
            {/* Top description */}
            <div className="services-description">
                <h2>Officers</h2>
                <p>If you want to book an appointment, please click on the image.</p>
            </div>

            {/* Officer list */}
            <div className="container">
                <div className="row">
                    {officers.map((officer) => (
                        <div
                            className="col-md-4 mb-4 text-center"
                            key={officer.id}
                            onClick={() => handleImageClick(officer)}
                        >
                            <img src={officer.image} alt={officer.name} className="img-fluid custom-img" />
                            <h4 className="officer-name">{officer.name}</h4>
                            <p className="officer-role">{officer.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AppointmentBooking;
