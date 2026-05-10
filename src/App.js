import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Trash2, 
  PlusCircle, 
  Clock, 
  BookOpen, 
  LogOut, 
  Layout,
  Moon,
  Sun
} from 'lucide-react';

const StudyMate = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [timer, setTimer] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) setIsLoggedIn(true);
  };

  // Task Handlers
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      alert("Waktu belajar selesai! Istirahat dulu yuk.");
      setIsActive(false);
      setTimer(1500);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <BookOpen className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">StudyMateee</h1>
          <p className="text-center text-gray-500 mb-8">Atur belajarmu jadi lebih disiplin</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Masukkan namamu..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Mulai Belajar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navbar */}
      <nav className={`p-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-500" />
            <span className="font-bold text-xl">StudyMateee</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <span className="hidden sm:inline font-medium">Halo, {username}!</span>
            <button onClick={() => setIsLoggedIn(false)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timer Section */}
        <div className={`p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <Clock size={24} />
            <h2 className="font-bold text-lg">Timer Pomodoro</h2>
          </div>
          <div className="text-center">
            <div className="text-6xl font-mono font-bold mb-6 tracking-tighter">
              {formatTime(timer)}
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`px-8 py-2 rounded-full font-bold transition ${isActive ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={() => { setIsActive(false); setTimer(1500); }}
                className="px-8 py-2 bg-gray-200 text-gray-700 rounded-full font-bold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Task Section */}
        <div className={`p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-4 text-green-500">
            <Layout size={24} />
            <h2 className="font-bold text-lg">Daftar Tugas</h2>
          </div>
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input 
              type="text"
              placeholder="Tugas baru..."
              className={`flex-1 p-2 rounded-lg outline-none border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}`}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="text-blue-600"><PlusCircle size={32} /></button>
          </form>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {tasks.length === 0 && <p className="text-center text-gray-400 py-4">Belum ada tugas.</p>}
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-opacity-50 border border-gray-100 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckCircle className="text-green-500" /> : <Circle className="text-gray-300" />}
                  </button>
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-red-400"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyMate;
      
