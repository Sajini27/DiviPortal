import React, { useContext, useState } from 'react';
import axios from 'axios';
import './amendent.css';
import { AppContext } from '../../../../../context/appContext';

const Amendment = () => {
    const { userId } = useContext(AppContext); 
    const [formData, setFormData] = useState({
        uid: userId,
        serviceId: 'amendent@',
        nameWithInitials: '',
        email: '',
        contactNumber: '',
    });
    const [files, setFiles] = useState({});
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    
    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e, documentName) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [documentName]: e.target.files[0],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
    
        console.log("Uploaded Files:");
    
        // Append text fields to FormData
        for (const [key, value] of Object.entries(formData)) {
            console.log(`${key}: ${value}`);
            formDataToSend.append(key, value);
        }
    
        // Append files to FormData and log file details
        for (const [documentName, file] of Object.entries(files)) {
            if (file) {
                const relativePath = `uploads/${file.name}`;
                formDataToSend.append(documentName, file);
                formDataToSend.append(`${documentName}Path`, relativePath);
            }
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/upload', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });
    
            setMessage(response.data.message);
    
            // **Reset Form After Success**
            setFormData({
                uid: userId,
                serviceId: 'amendent@',
                nameWithInitials: '',
                email: '',
                contactNumber: '',
            });
            setFiles({});
            setUploadProgress(0);
        } catch (error) {
            setMessage('Error submitting the form. Please try again.');
            console.error('Submission error:', error);
        }
    };
    


    // List of required documents
    const requiredDocuments = [
        { name: 'birthCertificate', label: 'Birth certificate required to be amended' },
        { name: 'marriageCertificate', label: 'Marriage Certificate of Parents' },
        { name: 'nicCopies', label: 'Photocopies of National Identity Cards of parents' },
        { name: 'residenceProof', label: 'Residence Proof Letter from Village Officer' },
        { name: 'affidavit', label: 'Affidavit if there are differences in the names of the parents' },
        { name: 'otherDocuments', label: 'Other required documents' },
    ];

    return (
        <div className="amendment">
            <h1>Birth Certificate Amendment Application</h1>
            <p>
                Details about the amendment process for Father, Grandfather, and Informant.
            </p>

            <div>
                <h3>Eligibility</h3>
                <p>
                    Information about mother, father, date of birth, place of birth, and
                    grandfather. They applied for villages called Gavanas rather than the
                    available information.
                </p>

                <h3>Checking documents for correctness at home before availing services</h3>


                <form onSubmit={handleSubmit}>
                    {/* Name with Initials */}
                    <div className="form-group">
                        <label>
                            Name with Initials:
                            <input
                                type="text"
                                name="nameWithInitials"
                                value={formData.nameWithInitials}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                        <label>
                            Email Address:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Contact Number */}
                    <div className="form-group">
                        <label>
                            Contact Number:
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <h3>Required Supporting Documents</h3>

                    {/* Document Uploads */}
                    {requiredDocuments.map((doc) => (
                        <div key={doc.name} className="form-group">
                            <label>
                                {doc.label}:
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => handleFileChange(e, doc.name)}
                                    required
                                />
                            </label>
                        </div>
                    ))}

                    <button type="submit">Submit</button>
                </form>

                {message && <p className="message">{message}</p>}

                {uploadProgress > 0 && (
                    <div className="progress-container">
                        <progress value={uploadProgress} max="100"></progress>
                        <span>{uploadProgress}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Amendment;