import React from 'react'
import BgHome from '../image/Home.png';
import Sehat from '../image/Sehat.png';

export default function Bpjs() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${BgHome})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* <nav className="p-4 flex justify-between items-center bg-black bg-opacity-35">
        <div className='flex justify-center items-center gap-3 text-white'>
        <img src={Sehat} alt="Oetomo Hospital Logo" className="h-8" />
        <p>Oetomo Hospital</p>
        </div>
        
        <ul className="flex space-x-8 text-white">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
        </ul>
        <button className="text-white flex items-center space-x-2 hover:underline">
          <span>Sign Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-14v1m0 14a9 9 0 11-8-4.473" />
          </svg>
        </button>
      </nav> */}

      <div className="flex-grow flex">
        <div className="lg:w-1/3 p-12 text-white">
          <h2 className="text-2xl font-bold mb-4 flex italic">Input Your BPJS Class Here</h2>
          <p className="mb-8 flex">Let's get started!</p>
          <form className="space-y-6">
            <div>
              <label htmlFor="disease-name" className="mb-2 flex">BPJS Class (1/2/3)</label>
              <input
                type="text"
                id="disease-name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-white"
              />
            </div>
            <button className="w-1/2 bg-yellow-500 text-black p-3 rounded-md hover:bg-yellow-600 flex justify-center">
              Search INA-CBG
            </button>
          </form>
          <table className="w-full mt-8 bg-opacity-50">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2">INA-CBG</th>
                <th className="border border-gray-500 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-500 p-2"></td>
                <td className="border border-gray-500 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer className="p-4 text-center text-white mt-28">
        Follow us on @MYTEAM.COM
      </footer>
    </div>
  )
}
