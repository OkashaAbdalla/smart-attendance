/**
 * Manage Lecturers Page (Admin)
 * Purpose: View, edit, and deactivate lecturer accounts
 */

import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

const ManageLecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // TODO: Replace with real API call
    const fetchLecturers = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLecturers([
        { id: 1, fullName: 'Dr. John Mensah', staffId: 'STAFF/001/2020', department: 'Computer Science', email: 'john.mensah@uds.edu.gh', status: 'active', createdAt: '2024-01-15' },
        { id: 2, fullName: 'Prof. Sarah Addo', staffId: 'STAFF/002/2019', department: 'Mathematics', email: 'sarah.addo@uds.edu.gh', status: 'active', createdAt: '2023-09-10' },
        { id: 3, fullName: 'Dr. Michael Owusu', staffId: 'STAFF/003/2021', department: 'Computer Science', email: 'michael.owusu@uds.edu.gh', status: 'inactive', createdAt: '2024-02-20' },
      ]);
      setLoading(false);
    };

    fetchLecturers();
  }, []);

  const handleToggleStatus = (id) => {
    setLecturers(lecturers.map(lec => 
      lec.id === id ? { ...lec, status: lec.status === 'active' ? 'inactive' : 'active' } : lec
    ));
  };

  const filteredLecturers = filter === 'all' ? lecturers : lecturers.filter(l => l.status === filter);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Manage Lecturers</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">View and manage lecturer accounts</p>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Lecturers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredLecturers.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Lecturers Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No lecturers match your filter</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Staff ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLecturers.map((lecturer) => (
                  <tr key={lecturer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{lecturer.fullName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lecturer.staffId}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lecturer.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lecturer.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lecturer.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        {lecturer.status.charAt(0).toUpperCase() + lecturer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(lecturer.id)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        {lecturer.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageLecturers;
