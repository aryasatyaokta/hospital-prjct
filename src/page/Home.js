import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BgHome from '../image/Home.png';
import Sehat from '../image/Sehat.png';
import { signOut } from 'firebase/auth';
import { auth } from '../component/Firebase';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [query, setQuery] = useState('');
  const [namaPasien, setNamaPasien] = useState('');
  const [ctrlfResults, setCtrlfResults] = useState([]);
  const [nlpResults, setNlpResults] = useState([]);
  const [manualResults, setManualResults] = useState([]);
  const [selectedNamaPenyakit, setSelectedNamaPenyakit] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const fetchData = async (url) => {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, query, nama_pasien: namaPasien }),
        });
        return response.json();
      };

      const [ctrlfData, nlpData, manualData] = await Promise.all([
        fetchData('https://ml-api-sd7tposlba-uc.a.run.app/search_icd_ctrlf'),
        fetchData('https://ml-api-sd7tposlba-uc.a.run.app/search_icd_nlp'),
        fetchData('https://ml-api-sd7tposlba-uc.a.run.app/search_icd_manual'),
      ]);

      setCtrlfResults(ctrlfData);
      setNlpResults(nlpData);
      setManualResults(manualData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleSelect = async () => {
    if (selectedNamaPenyakit) {
      setIsSelecting(true);

      try {
        const response = await fetch('https://ml-api-sd7tposlba-uc.a.run.app/select_icd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, nama_penyakit: selectedNamaPenyakit, nama_pasien: namaPasien, query }),
        });
        const data = await response.json();
        setSelectedResult(data);
        setIsSelecting(false);
      } catch (error) {
        console.error('Error:', error);
        setIsSelecting(false);
      }
    }
  };

  const renderResults = (data, setSelected) => (
    data.map((item, index) => (
      <div
        key={index}
        className={`result-item p-2 my-2 border rounded cursor-pointer ${item.similarity !== 0 ? 'hover:bg-blue-200' : 'text-gray-400'}`}
        onClick={() => {
          if (item.similarity !== 0) {
            setSelected(item.nama_penyakit);
          }
        }}
      >
        <div className="kode-icd">Kode ICD: {item.kode_icd}</div>
        <div className="nama-penyakit">Nama Penyakit: {item.nama_penyakit}</div>
      </div>
    ))
  );

  return (
    <div className="bg-center bg-cover" style={{ backgroundImage: `url(${BgHome})` }}>
      <nav className="p-4 flex justify-between items-center bg-black bg-opacity-35">
        <div className='flex justify-center items-center gap-3 text-white'>
          <img src={Sehat} alt="Oetomo Hospital Logo" className="h-8" />
          <p>Oetomo Hospital</p>
        </div>
        
        <ul className="flex space-x-8 text-white">
          <Link to="/"><li><a href="#" className="hover:underline">Home</a></li></Link>
          <li><a href="#" className="hover:underline">About</a></li>
          <li>
            <a 
              href="https://wa.me/6281239903121" 
              className="hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </li>
        </ul>
        <button onClick={handleSignOut} className="text-white flex items-center space-x-2 hover:underline">
          <span>Sign Out</span>
          <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
          </svg>
        </button>
      </nav>

      <div className="flex">
        <div className="p-12 text-white">
          <h2 className="text-2xl font-bold mb-4 flex italic">Input Your Diagnosis Here</h2>
          <p className="mb-8 flex">Let's get started!</p>
          <div className='grid grid-cols-2'>
            <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
              <div>
                <label className="text-sm font-medium flex">Dokter ID</label>
                <input
                  type="text"
                  id="user_id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                />
              </div>
              <div>
                <label className="flex text-sm font-medium">Disease Name</label>
                <input
                  type="text"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                />
              </div>
              <div>
                <label className="flex text-sm font-medium">Nama Pasien</label>
                <input
                  type="text"
                  id="nama_pasien"
                  value={namaPasien}
                  onChange={(e) => setNamaPasien(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded hover:bg-blue-700">
                Search
              </button>
              {isLoading && <div className="mt-4 text-center">Loading...</div>}
            </form>
            <div className="mt-4 flex gap-4">
            <div className="w-1/3 h-60 overflow-y-scroll">
              <h2 className="text-xl font-bold">Choose ICD (CTRL+F)</h2>
              <div id="ctrlf-results" className="space-y-2">
                {renderResults(ctrlfResults, setSelectedNamaPenyakit)}
              </div>
            </div>
            <div className="w-1/3 h-60 overflow-y-scroll">
              <h2 className="text-xl font-bold">Choose ICD (NLP)</h2>
              <div id="nlp-results" className="space-y-2">
                {renderResults(nlpResults, setSelectedNamaPenyakit)}
              </div>
            </div>
            <div className="w-1/3 h-60 overflow-y-scroll">
              <h2 className="text-xl font-bold">Choose ICD (Manual)</h2>
              <div id="manual-results" className="space-y-2">
                {renderResults(manualResults, setSelectedNamaPenyakit)}
              </div>
            </div>
          </div>
          </div>
          
          {selectedNamaPenyakit && (
            <button
              id="select-btn"
              onClick={handleSelect}
              className="w-full py-2 px-4 mt-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
          {isSelecting && <div className="mt-4 text-center">Selecting...</div>}
          {selectedResult && (
            <div id="selected-result" className="mt-4 bg-green-100 p-4 rounded shadow-md text-black">
              <div>Kode ICD: {selectedResult.selected_kode_icd}</div>
              <div>Nama Penyakit: {selectedResult.selected_nama_penyakit}</div>
            </div>
          )}
        </div>
      </div>
      <footer className="text-center text-white mt-20">
        Follow us on @MYTEAM.COM
      </footer>
    </div>
  );
}
