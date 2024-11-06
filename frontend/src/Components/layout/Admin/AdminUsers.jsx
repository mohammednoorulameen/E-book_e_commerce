import React, { useEffect, useState } from 'react';
import {  FaFileExport, FaFileImport, FaPencilAlt, FaCopy } from 'react-icons/fa';
import {  useGetUserListQuery,} from "../../../Services/Apis/AdminApi";
const UsersList = () => {
  const [activeTab, setActiveTab] = useState('members');
  const {data,isError}=useGetUserListQuery()
  console.log(data);
  
  // useEffect(() => {
  //   const response = 
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  


  const users = [
    { id: 1, name: 'George Lindelof', mobile: '+4 315 23 62', email: 'carlsen@armand.no', status: 'Active', photo: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Eric Dyer', mobile: '+2 134 25 65', email: 'cristofer.ajer@lone.no', status: 'Active', photo: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Haitam Alessami', mobile: '+1 345 22 21', email: 'haitam@gmail.com', status: 'Active', photo: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'Michael Campbel', mobile: '+1 756 52 73', email: 'camp@hotmail.com', status: 'Inactive', photo: '/placeholder.svg?height=40&width=40' },
    { id: 5, name: 'Ashley Williams', mobile: '+1 965 43 11', email: 'williams.ash@newl.com', status: 'Active', photo: '/placeholder.svg?height=40&width=40' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          <button
            className={`pb-4 px-2 ${activeTab === 'members' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'admins' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('admins')}
          >
            Admins
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Members</h2>
          <div className="flex gap-3">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Add new member
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileImport />
              Import members
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileExport />
              Export members (Excel)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">No</th>
                <th className="text-left py-4 px-6">Member name</th>
                <th className="text-left py-4 px-6">Mobile</th>
                <th className="text-left py-4 px-6">Email</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  {/* <td className="py-4 px-6">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td> */}
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.mobile}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-indigo-600">
                        <FaCopy className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-indigo-600">
                        <FaPencilAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
