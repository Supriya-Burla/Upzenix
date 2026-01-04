import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Palette, Monitor, User, Bell, Database, Shield, Info } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [account, setAccount] = useState({ name: 'Admin User', email: 'admin@movie.com', password: 'admin' });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState({ name: '', email: '' });

  const [changingPassword, setChangingPassword] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });

  useEffect(() => {
    const saved = localStorage.getItem('account');
    if (saved) setAccount(JSON.parse(saved));
  }, []);

  const saveAccount = (updated) => {
    setAccount(updated);
    localStorage.setItem('account', JSON.stringify(updated));
    addToast('Profile updated', 'success');
  };

  const handleStartEdit = () => {
    setProfileDraft({ name: account.name || '', email: account.email || '' });
    setEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setEditingProfile(false);
  };

  const handleSaveEdit = () => {
    const updated = { ...account, ...profileDraft };
    saveAccount(updated);
    setEditingProfile(false);
  };

  const handleChangePassword = () => {
    // validation
    if (pwForm.current !== account.password) {
      addToast('Current password is incorrect', 'error');
      return;
    }
    if (!pwForm.newPw || pwForm.newPw.length < 6) {
      addToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      addToast('New password and confirmation do not match', 'error');
      return;
    }
    const updated = { ...account, password: pwForm.newPw };
    saveAccount(updated);
    setPwForm({ current: '', newPw: '', confirm: '' });
    setChangingPassword(false);
    addToast('Password changed', 'success');
  };

  const handleClearAll = () => {
    if (!confirm('Permanently delete all movies and settings?')) return;
    localStorage.removeItem('movies');
    localStorage.removeItem('kanbanColumns');
    localStorage.removeItem('theme');
    localStorage.removeItem('account');
    addToast('All data cleared', 'success');
    // reload to reflect cleared data
    setTimeout(() => window.location.reload(), 500);
  };

  const handleExportData = () => {
    const data = {
      movies: JSON.parse(localStorage.getItem('movies') || '[]'),
      kanbanColumns: JSON.parse(localStorage.getItem('kanbanColumns') || '[]'),
      account: JSON.parse(localStorage.getItem('account') || '{}'),
      theme: JSON.parse(localStorage.getItem('theme') || 'false'),
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `movie-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Data exported successfully', 'success');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data.movies) localStorage.setItem('movies', JSON.stringify(data.movies));
            if (data.kanbanColumns) localStorage.setItem('kanbanColumns', JSON.stringify(data.kanbanColumns));
            if (data.account) localStorage.setItem('account', JSON.stringify(data.account));
            if (data.theme !== undefined) localStorage.setItem('theme', JSON.stringify(data.theme));
            addToast('Data imported successfully', 'success');
            setTimeout(() => window.location.reload(), 500);
          } catch (error) {
            addToast('Invalid file format', 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleBackupSettings = () => {
    const settings = {
      account: JSON.parse(localStorage.getItem('account') || '{}'),
      theme: JSON.parse(localStorage.getItem('theme') || 'false'),
      backedUpAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Settings backed up successfully', 'success');
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Customize your dashboard experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-3">
                {isDark ? <Moon className="w-5 h-5 text-blue-500" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                <div>
                  <p className="font-medium text-white">Theme Mode</p>
                  <p className="text-sm text-gray-400">Toggle between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDark ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Account</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-white">Profile Information</p>
                  <p className="text-sm text-gray-400">Update your personal details</p>
                </div>
                {!editingProfile ? (
                  <button onClick={handleStartEdit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Edit</button>
                ) : (
                  <div className="space-x-2">
                    <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Save</button>
                    <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500">Cancel</button>
                  </div>
                )}
              </div>
              {!editingProfile ? (
                <div>
                  <p className="text-white">{account.name}</p>
                  <p className="text-sm text-gray-400">{account.email}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <input value={profileDraft.name} onChange={(e)=>setProfileDraft(prev=>({...prev,name:e.target.value}))} className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
                  <input value={profileDraft.email} onChange={(e)=>setProfileDraft(prev=>({...prev,email:e.target.value}))} className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-white">Change Password</p>
                  <p className="text-sm text-gray-400">Update your account password</p>
                </div>
                {!changingPassword ? (
                  <button onClick={()=>setChangingPassword(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Change</button>
                ) : (
                  <div className="space-x-2">
                    <button onClick={handleChangePassword} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Save</button>
                    <button onClick={()=>{setChangingPassword(false); setPwForm({current:'',newPw:'',confirm:''})}} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500">Cancel</button>
                  </div>
                )}
              </div>
              {changingPassword && (
                <div className="space-y-3">
                  <input type="password" placeholder="Current password" value={pwForm.current} onChange={(e)=>setPwForm(prev=>({...prev,current:e.target.value}))} className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
                  <input type="password" placeholder="New password" value={pwForm.newPw} onChange={(e)=>setPwForm(prev=>({...prev,newPw:e.target.value}))} className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
                  <input type="password" placeholder="Confirm new password" value={pwForm.confirm} onChange={(e)=>setPwForm(prev=>({...prev,confirm:e.target.value}))} className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-xl border border-red-800">
              <div>
                <p className="font-medium text-red-100">Clear All Data</p>
                <p className="text-sm text-red-400">Permanently delete all movies and settings</p>
              </div>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Clear
              </button>
            </div>
          </div>
        {/* Notifications Settings */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive email updates about new movies and system alerts</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow translate-x-1"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-white">Push Notifications</p>
                <p className="text-sm text-gray-400">Get browser notifications for important updates</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow translate-x-6"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-white">Weekly Reports</p>
                <p className="text-sm text-gray-400">Receive weekly analytics reports via email</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-white">Export Data</p>
                  <p className="text-sm text-gray-400">Download all your data as JSON file</p>
                </div>
                <button onClick={handleExportData} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Export</button>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-white">Import Data</p>
                  <p className="text-sm text-gray-400">Import data from a JSON file</p>
                </div>
                <button onClick={handleImportData} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Import</button>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-white">Backup Settings</p>
                  <p className="text-sm text-gray-400">Create a backup of your current settings</p>
                </div>
                <button onClick={handleBackupSettings} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">Backup</button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors text-sm">
                Coming Soon
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-white">Session Management</p>
                <p className="text-sm text-gray-400">View and manage active sessions</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Manage</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-white">Login History</p>
                <p className="text-sm text-gray-400">View recent login activity</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">View</button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Info className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">About</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Version</p>
                  <p className="text-white font-medium">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="text-white font-medium">January 2026</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Framework</p>
                  <p className="text-white font-medium">React + Vite</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">UI Library</p>
                  <p className="text-white font-medium">Tailwind CSS</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-xl">
              <p className="text-white font-medium mb-2">Support</p>
              <p className="text-sm text-gray-400 mb-3">Need help? Contact our support team</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Contact Support</button>
            </div>
          </div>
        </div>

export default SettingsPage;