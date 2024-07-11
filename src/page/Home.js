import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgHome from '../image/Home.png';
import Sehat from '../image/Sehat.png';
import { signOut } from 'firebase/auth';
import { auth } from '../component/Firebase';
import axios from 'axios';

export default function Home() {
  const [diseaseName, setDiseaseName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedICD, setSelectedICD] = useState(null);
  const [icdDetails, setIcdDetails] = useState(null);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully");
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoadingQuery(true);
    setFilteredData([]);
    try {
      const response = await axios.post('https://ml-api-sd7tposlba-uc.a.run.app/search_icd', { query: diseaseName });
      const data = response.data;
      setFilteredData(data.length > 0 ? data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingQuery(false);
    }
  };

  const handleSelectICD = async (event) => {
    event.preventDefault();
    setLoadingIndex(true);
    setIcdDetails(null);
    try {
      const response = await axios.post('https://ml-api-sd7tposlba-uc.a.run.app/select_icd', { index: parseInt(selectedICD, 10) });
      const data = response.data;
      setIcdDetails(data.selected_kode_icd ? data : null);
  
      // Navigate to BPJS page with selected ICD data
      const url = `/bpjs?kode_icd=${data.selected_kode_icd}&nama_penyakit=${data.selected_nama_penyakit}`;
      window.location.href = url;
    } catch (error) {
      console.error('Error fetching ICD details:', error);
    } finally {
      setLoadingIndex(false);
    }
  };

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${BgHome})` }}>
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
          <form id="searchForm" className="space-y-6" onSubmit={handleSearch}>
            <div>
              <label htmlFor="disease-name" className="mb-2 flex">Disease Name</label>
              <input
                type="text"
                id="query"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-white"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
              />
            </div>
            <button className="w-1/2 bg-yellow-500 text-black p-3 rounded-md hover:bg-yellow-600 flex justify-center">
              {loadingQuery ? 'Loading...' : 'Search ICD'}
            </button>
          </form>
          <div id="resultsQuery" className='overflow-y-auto max-h-[calc(60vh-12rem)]'>
            <table className="w-full mt-8 bg-opacity-50">
              <thead>
                <tr>
                  <th className="border border-gray-500 p-2">ICD</th>
                  <th className="border border-gray-500 p-2">Disease Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} onClick={() => setSelectedICD(item.kode_icd)}>
                    <td className="border border-gray-500 p-2">{item.kode_icd}</td>
                    <td className="border border-gray-500 p-2">{item.nama_penyakit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:block lg:w1/2 justify-center items-center p-36">
          <label htmlFor="icd-select" className="block mb-2 text-xl text-white">Choose ICD</label>
          <form id="icdForm" onSubmit={handleSelectICD}>
            <div>
              <select
                id="index"
                className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-black text-white"
                onChange={(e) => setSelectedICD(e.target.value)}
                value={selectedICD || ''}
              >
                <option value="">Select an ICD</option>
                {Array.isArray(filteredData) && filteredData.map((item, index) => (
                  <option key={index} value={item.kode_icd}>{item.kode_icd}</option>
                ))}
              </select>
              <button className="w-2/4 bg-white text-black p-3 rounded-md hover:bg-gray-300">
                {loadingIndex ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
          <div id="resultsIndex">
            {icdDetails && (
              <div className="result-item">
                <p><strong>Code:</strong> {icdDetails.selected_kode_icd}</p>
                <p><strong>Description:</strong> {icdDetails.selected_nama_penyakit}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-white mt-24">
        Follow us on @MYTEAM.COM
      </footer>
    </div>
  );
}
