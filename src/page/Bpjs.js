import React, { useState, useEffect } from 'react';
import BgHome from '../image/Home.png';
import { useNavigate, Link } from 'react-router-dom';
import Sehat from '../image/Sehat.png';
import { signOut } from 'firebase/auth';
import { auth } from '../component/Firebase';

export default function Bpjs() {
  const [userId, setUserId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [query, setQuery] = useState('');
  const [table, setTable] = useState('');
  const [results, setResults] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [patientNames, setPatientNames] = useState([]);
  const [queries, setQueries] = useState([]);
  const [icdCode, setIcdCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(false);
  const [loadingPatientName, setLoadingPatientName] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [loadingIcdCode, setLoadingIcdCode] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully");
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    fetchUserIds();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPatientNames(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && patientName) {
      fetchQueries(userId, patientName);
    }
  }, [patientName]);

  useEffect(() => {
    if (userId && patientName && query) {
      fetchIcdCodes(userId, patientName, query);
    }
  }, [query]);

  const fetchUserIds = async () => {
    setLoadingUserId(true);
    try {
      const response = await fetch("https://ml-api-sd7tposlba-uc.a.run.app/get_user_ids");
      const userIds = await response.json();
      setUserIds(userIds);
      if (userIds.length > 0) {
        setUserId(userIds[0]);
      }
    } catch (error) {
      console.error("Error fetching user IDs:", error);
    } finally {
      setLoadingUserId(false);
    }
  };

  const fetchPatientNames = async (userId) => {
    setLoadingPatientName(true);
    try {
      const response = await fetch(`https://ml-api-sd7tposlba-uc.a.run.app/get_patient_names?user_id=${userId}`);
      const patientNames = await response.json();
      setPatientNames(patientNames.slice(-7));
      if (patientNames.length > 0) {
        setPatientName(patientNames[0]);
      }
    } catch (error) {
      console.error("Error fetching patient names:", error);
    } finally {
      setLoadingPatientName(false);
    }
  };

  const fetchQueries = async (userId, patientName) => {
    setLoadingQuery(true);
    try {
      const response = await fetch(`https://ml-api-sd7tposlba-uc.a.run.app/get_queries?user_id=${userId}&patient_name=${patientName}`);
      const queries = await response.json();
      setQueries(queries);
      if (queries.length > 0) {
        setQuery(queries[0]);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoadingQuery(false);
    }
  };

  const fetchIcdCodes = async (userId, patientName, query) => {
    setLoadingIcdCode(true);
    try {
      const response = await fetch(`https://ml-api-sd7tposlba-uc.a.run.app/get_icd_codes?user_id=${userId}&patient_name=${patientName}&query=${query}`);
      const icdCodes = await response.json();
      setIcdCode(icdCodes.length > 0 ? icdCodes[0] : '');
    } catch (error) {
      console.error("Error fetching ICD codes:", error);
    } finally {
      setLoadingIcdCode(false);
    }
  };

  const searchQuery = async () => {
    setLoading(true);
    setResults([]);
    try {
      const response = await fetch(`https://ml-api-sd7tposlba-uc.a.run.app/search/${table}?q=${query}`);
      const data = await response.json();
      setResults(data.map(({ nomer, no, ...rest }) => rest));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (results.length === 0) {
      return <p>No results found.</p>;
    }

    const headers = table === "klaim_inacbg"
      ? ["bab", "diagnosa", "prosedur", "aspek_koding", "perhatian_khusus"]
      : table === "medis"
      ? ["diagnosa", "prosedur", "aspek_medis", "perhatian_khusus"]
      : ["diagnosa", "prosedur", "perihal_administrasi", "solusi_administrasi", "perhatian_khusus"];

    return (
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-2 border-b">{header.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header} className="px-4 py-2 border-b">{item[header] || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="bg-center bg-cover min-h-screen" style={{ backgroundImage: `url(${BgHome})` }}>
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
      <div className="flex mb-44">
        <div className="p-12 text-white">
          <h2 className="text-2xl font-bold mb-4 flex italic">Input Your Disease</h2>
          <p className="mb-8 flex">Let's get started!</p>
          <div className='grid grid-cols-2'>
            <div className="p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="user-id" className=" text-white flex">User ID</label>
                <select
                  id="user-id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                >
                  {loadingUserId ? <option>Loading...</option> : userIds.map(id => <option key={id} value={id}>{id}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="patient-name" className="flex text-white">Patient Name</label>
                <select
                  id="patient-name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                >
                  {loadingPatientName ? <option>Loading...</option> : patientNames.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="query" className="flex text-white">Nama Penyakit</label>
                <select
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                >
                  {loadingQuery ? <option>Loading...</option> : queries.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="icd-code" className="flex text-white">Kode ICD</label>
                <input
                  type="text"
                  id="icd-code"
                  value={icdCode}
                  readOnly
                  className="mt-1 p-2 w-full border rounded bg-gray-100 text-black"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="table-select" className="flex text-white">Pilihan Bab</label>
                <select
                  id="table-select"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  className="mt-1 p-2 w-full border rounded text-black"
                >
                  <option value="">Select Table</option>
                  <option value="klaim_inacbg">Manual Koding</option>
                  <option value="medis">Medis</option>
                  <option value="administrasi">Administrasi</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  id="search-button"
                  onClick={searchQuery}
                  className="py-2 px-32 bg-yellow-500 text-white font-bold rounded hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-auto text-black">
              {loading ?
                <p>Loading...</p> : renderResults()
              }
            </div>
          </div>
        </div>
      </div>
      <footer className="text-centertext-white">
        Follow us on @MYTEAM.COM
      </footer>
    </div>
  );
}
