import React, { useState } from 'react';
import BgLogin from '../image/Login.png';
import GbSehat from '../image/Sehat.png';
import User from '../image/user.png';
import Pass from '../image/pass.png';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../component/Firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Query Firestore to find the email associated with the username
      const q = query(collection(db, "Users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No user found with this username.");
      }

      const userDoc = querySnapshot.docs[0];
      const email = userDoc.data().email;

      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully");
      toast.success("User Logged In Successfully!!", {
        position: "top-center"
      });

      // Redirect based on username
      if (username === "admin") {
        navigate('/bpjs');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center"
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${BgLogin})` }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 mb-16 md:gap-64 w-full mr-12">
        <h1 className="text-2xl">Oetomo Hospital</h1>
        <img src={GbSehat} alt="Logo" className="w-28 h-28" />
        <h2 className="text-xl font-medium">Telkom University</h2>
      </div>
      <div className="p-8 rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full mb-4 relative">
            <img src={User} alt="User Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6" />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 pl-10 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full mb-4 relative">
            <img src={Pass} alt="Password Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
            Get Started
          </button>
        </form>
        <div className="flex justify-between w-full mt-4 text-sm">
          <Link to="/register"><a href="#">Create Account</a></Link>
          <a href="#">Need Help?</a>
        </div>
      </div>
    </div>
  );
}
