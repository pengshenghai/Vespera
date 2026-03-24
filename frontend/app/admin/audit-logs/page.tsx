'use client';

import React, { useState } from 'react';
// Using relative path to ensure Vercel build compatibility
import { AuditLogList } from '../../components/AuditLogList';
import { Search, Download, X, info } from 'lucide-react';

export default function AuditLogsPage() {
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const mockLogs = [
    { id: 1, timestamp: '2026-03-24 14:30:01', user: 'admin@chioma.io', action: 'KYC_APPROVE', resource: 'User_882', ip: '192.168.1.1', details: 'Approved identity verification for new tenant.' },
    { id: 2, timestamp: '2026-03-24 12:15:22', user: 'system_bot', action: 'TOKEN_MINT', resource: 'Asset_991', ip: '10.0.0.45', details: 'Generated smart contract tokens for Property Block B.' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Audit Log Viewer</h1>
          <p className="text-slate-500">Compliance monitoring and system activity trails.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* FILTERS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by user, action, or resource..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
          />
        </div>
        <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
          <option>All Activity Types</option>
          <option>Security</option>
          <option>Contract</option>
          <option>User Management</option>
        </select>
      </div>

      {/* TABLE COMPONENT */}
      <AuditLogList logs={mockLogs} onViewDetails={setSelectedLog} />

      {/* DETAIL MODAL - Renders when a log is selected */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Event Details</h3>
              <button 
                onClick={() => setSelectedLog(null)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Action</label>
                  <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{selectedLog.action}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Resource</label>
                  <p className="font-mono text-sm dark:text-slate-200">{selectedLog.resource}</p>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Metadata</label>
                <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{selectedLog.details}"</p>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[11px] font-mono text-slate-400">
                    <span>IP: {selectedLog.ip}</span>
                    <span>ID: {selectedLog.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/30 flex justify-end">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
