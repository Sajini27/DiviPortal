import React from 'react';
import './AboutUs.css';

function AboutUs() {
    return (
        <div className="aboutus">
            {/* Title Section */}
            <div className="title">
                <h1>About Us</h1>
            </div>

            {/* Vision and Mission Section */}
            <div className="vision-mission">
                <div className="aboutus-left">
                    <h2>Our Vision</h2>
                    <p>To achieve excellence through customer satisfaction.</p>
                </div>
                <div className="aboutus-right">
                    <h2>Our Mission</h2>
                    <p>Uplift the living conditions of the community in the division through efficient, sustainable, and well-planned development processes with public engagement, service delivery, and resource coordination, in line with government policies.</p>
                </div>
            </div>

            {/* History Section */}
            <div className="history">
                <h2>History of Kuruwita Divisional Secretariat Office</h2>
                <p>
                    Kuruwita Divisional Secretariat Division is situated in the Ratnapura District of the Sabaragamuwa Province. It is bordered by the Ratnapura, Kiriella, Ehaliyagoda, Dehiowita, and Daraniyagala Divisional Secretariat Divisions. To the north, it shares boundaries with Ehaliyagoda, Dehiowita, and Daraniyagala; to the east with Ratnapura; to the west with Kiriella; and to the south with both Ratnapura and Kiriella. This division covers a land area of approximately 172.83 square kilometers, making it the 13th largest among the 17 divisions in the district. It consists of 39 Grama Niladhari (G.N.) divisions and 101 villages.
                    <br /><br />
                    The division is located near the iconic Samanala Kanda (Adam's Peak) and is encircled by several smaller mountains, creating a scenic mountainous landscape. Geographically, it lies between latitudes 5.41 and 6.52 (141-185 km north) and longitudes 90.15 and 80.28 (141-165 km east), with an elevation ranging from 1,000 to 3,500 feet above sea level. The terrain consists of both flat and hilly areas. The Kuruganga River and the Bopath Falls flow through this division, contributing to the area's natural beauty. However, soil erosion is a significant issue due to frequent floods and gem mining activities.
                    <br /><br />
                    The climate in this area falls under the low-country wet zone category, with heavy rainfall particularly during the North-West Monsoon. During this period, low-lying areas are prone to flooding, while higher regions are susceptible to landslides.
                    <br /><br />
                    The total population of the Kuruwita division is approximately 98,345, spread across 39 G.N. divisions and 101 villages. Agriculture is the main livelihood for the residents, though it is generally subsistence farming rather than commercial-scale production. Farmers primarily grow tea, rubber, and coconut, contributing to the plantation sector. In addition, the division hosts several small and medium-sized industries, including light engineering, carpentry, masonry, electrical and electronics, brick and clay production, handicrafts, and gem mining and cutting, as well as gem and jewelry industries.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;