import React, { useState, useEffect } from 'react';
import BgHome from '../image/Home.png';
import Sehat from '../image/Sehat.png';
import { signOut } from 'firebase/auth';
import { auth } from '../component/Firebase';
import axios from 'axios';

export default function Home() {
  const [icdData, setIcdData] = useState([]);
  const [diseaseName, setDiseaseName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchIcdData = async () => {
      try {
        const response = await axios.get('https://ml-api-sd7tposlba-uc.a.run.app');
        if (Array.isArray(response.data)) {
          setIcdData(response.data);
        } else {
          console.error('Received data is not an array:', response.data);
          setIcdData([]);
        }
      } catch (error) {
        console.error("Error fetching ICD data:", error.message);
        setIcdData([]);
      }
    };
    fetchIcdData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully");
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (Array.isArray(icdData)) {
      const filtered = icdData.filter(item => item.diseaseName.toLowerCase().includes(diseaseName.toLowerCase()));
      setFilteredData(filtered);
    } else {
      console.error('icdData is not an array:', icdData);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${BgHome})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <nav className="p-4 flex justify-between items-center bg-black bg-opacity-35">
        <div className='flex justify-center items-center gap-3 text-white'>
          <img src={Sehat} alt="Oetomo Hospital Logo" className="h-8" />
          <p>Oetomo Hospital</p>
        </div>
        
        <ul className="flex space-x-8 text-white">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
        </ul>
        <button onClick={handleSignOut} className="text-white flex items-center space-x-2 hover:underline">
          <span>Sign Out</span>
          <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
          </svg>
        </button>
      </nav>

      <div className="flex-grow flex">
        <div className="lg:w-1/3 p-12 text-white">
          <h2 className="text-2xl font-bold mb-4 flex italic">Input Your Diagnosis Here</h2>
          <p className="mb-8 flex">Let's get started!</p>
          <form className="space-y-6" onSubmit={handleSearch}>
            <div>
              <label htmlFor="disease-name" className="mb-2 flex">Disease Name</label>
              <input
                type="text"
                id="disease-name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-white"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
              />
            </div>
            <button className="w-1/2 bg-yellow-500 text-black p-3 rounded-md hover:bg-yellow-600 flex justify-center">
              Search ICD
            </button>
          </form>
          <table className="w-full mt-8 bg-opacity-50">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2">ICD</th>
                <th className="border border-gray-500 p-2">Disease Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-2">{item.icd}</td>
                  <td className="border border-gray-500 p-2">{item.diseaseName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:block lg:w-1/2 justify-center items-center p-36">
          <label htmlFor="icd-select" className="block mb-2 text-xl text-white">Choose ICD</label>
          <div>
            <select
              id="icd-select"
              className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-white"
            >
              <option value="">Select an ICD</option>
              {Array.isArray(icdData) && icdData.map((item, index) => (
                <option key={index} value={item.icd}>{item.icd}</option>
              ))}
            </select>
            <br />
            <button className="w-2/4 bg-white text-black p-3 rounded-md hover:bg-gray-300">
              Submit
            </button>
          </div>
        </div>
      </div>

      <footer className="p-4 text-center text-white mt-28">
        Follow us on @MYTEAM.COM
      </footer>
    </div>
  );
}
