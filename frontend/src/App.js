// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Imge from './components/phto/Imge';
import About from './components/About/About';
import AboutUs from './components/AboutUs/AboutUs';
import Feedback from './components/Feedback/Feedback';
import Services from './components/Services/Services';
import Login from './components/login/Login';
import Myprofile from './components/myprofile/Myprofile';
import Myappoinment from './components/myappoinment/Myappoinment';
import Civil from './components/Services/civil/civil';
import Certificate from './components/Services/certificate/certificate';
import Land from './components/Services/land/land';
import Pension from './components/Services/pension/pension';
import Permits from './components/Services/permits/permits';
import AppointmentBooking from './components/Services/appoinment/AppointmentBooking';
import Birth from './components/Services/civil/birth/birth';
import Death from './components/Services/civil/death/death';
import Marriage from './components/Services/civil/marriage/marriage';
import NameChange from './components/Services/civil/namechange/namechange';
import Amendent from './components/Services/civil/birth/amendent/amendent';
import Copies from './components/Services/civil/birth/copies/copies';
import Delayed from './components/Services/civil/birth/delayed/delayed';
import Trees from './components/Services/permits/tree/tree';
import Timber from './components/Services/permits/timber/timber';
import Soil from './components/Services/permits/soil/soil';
import Animal from './components/Services/permits/animal/animal';
import Window from './components/Services/pension/window/window';
import Orphans from './components/Services/pension/orphans/orphans';
import ContactUs from './components/ContactUs/ContactUs';
import OfficerDashboard from './components/Dashboards/OfficerDashboard';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import StaffDashboard from './components/Dashboards/StaffDashboard';
import AddOfficer from './components/Dashboards/adminFunctions/addOfficers';
import AddStaff from './components/Dashboards/adminFunctions/addStaff';
import AddUser from './components/Dashboards/adminFunctions/addUser'; // Note: filename is case sensitive
import Bookings from './components/Services/appoinment/booking';

function App() {
  return (
    <div>
      {/* Always render Navbar */}
      <Navbar />

      <div>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/hero' element={<Hero />} />
          <Route path='/about' element={<About subabout='Welcome to Kuruwita' about='Beauty of Kuruwita' />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/image' element={<Imge />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Myprofile />} />
          <Route path='/myappoinment' element={<Myappoinment />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/services' element={<Services />} />

          <Route path="/civil" element={<Civil />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/land" element={<Land />} />
          <Route path="/pension" element={<Pension />} />
          <Route path="/permits" element={<Permits />} />
          <Route path="/appoinment" element={<AppointmentBooking />} />
          <Route path="/bookings" element={<Bookings />} />

          <Route path="/birth" element={<Birth />} />
          <Route path="/marriage" element={<Marriage />} />
          <Route path="/death" element={<Death />} />
          <Route path="/namechange" element={<NameChange />} />
          <Route path="/delayed" element={<Delayed />} />
          <Route path="/copies" element={<Copies />} />
          <Route path="/amendment" element={<Amendent />} />

          <Route path="/permit_for_felling_tree" element={<Trees />} />
          <Route path="/permit_for_timber_transport" element={<Timber />} />
          <Route path="/permit_for_soil_transport" element={<Soil />} />
          <Route path="/permit_for_animal_transport" element={<Animal />} />

          <Route path="/pension_for_windows" element={<Window />} />
          <Route path="/pension_for_orphans" element={<Orphans />} />
          <Route path="/officer-dashboard" element={<OfficerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path='/staff-dashboard' element={<StaffDashboard />} />

          <Route path="/admin/officers" element={<AddOfficer mode="add" />} />
          <Route path="/admin/officers/edit/:id" element={<AddOfficer mode="edit" />} />
          <Route path="/admin/staff" element={<AddStaff mode="add" />} />
          <Route path="/admin/staff/edit/:id" element={<AddStaff mode="edit" />} />

          {/* Note the change from "/admin/user" to "/admin/users" */}
          <Route path="/admin/user" element={<AddUser mode="add" />} />
          <Route path="/admin/user/edit/:id" element={<AddUser mode="edit" />} />
        </Routes>
      </div>

      {/* Always render Footer */}
      <Footer />
    </div>
  );
}

export default App;
