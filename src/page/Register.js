import React, { useState } from 'react';
import BgRegister from '../image/Register.png';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../component/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tanggal, setTanggal] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          firstname: firstname,
          lastname: lastname,
          email: user.email,
          username: username,
          tanggal: tanggal
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center"
      });
      navigate('/login');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center"
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BgRegister})` }}
    >
      <div className="p-8 rounded-lg w-full max-w-4xl flex flex-col">
        <div className="w-full lg:w-[500px] p-8">
          <h2 className="text-3xl font-bold mb-4">Create Your Account Here</h2>
          <p className="mb-8">Before continue, please Sign Up first to join with us</p>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="flex gap-4">
              <div className="relative w-1/2">
                <p className='float-start font-bold'>First Name</p>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="relative w-1/2">
                <p className='float-start font-bold'>Last Name</p>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative w-1/2">
                <p className='float-start font-bold'>E-mail Address</p>
                <input
                  type="email"
                  placeholder="E-mail Address"
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative w-1/2">
                <p className='float-start font-bold'>Username</p>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative w-1/2">
                <p className='float-start font-bold'>Password</p>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative w-1/2">
                <p className='float-start font-bold'>Birthday</p>
                <input
                  type="date"
                  placeholder="Birthday"
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm">
                I have read the <a href="#" className="text-blue-600">Terms & Conditions</a>
              </label>
            </div>
            <button className="w-full bg-blue-600 text-white p-3 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an Account? <Link to="/login"><a href="#" className="text-blue-600">Click here to Sign In</a></Link>
          </p>
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${BgRegister})` }}></div>
      </div>
    </div>
  );
}
