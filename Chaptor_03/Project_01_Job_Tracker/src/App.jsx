import React, { useState, useEffect, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Plus, 
  Search, 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  Trash2, 
  Filter,
  ArrowUpDown,
  LayoutDashboard,
  Target,
  Send,
  MessageCircle,
  Clock,
  Trophy,
  XCircle,
  Briefcase
} from 'lucide-react';

import { KanbanColumn } from './components/KanbanColumn';
import { JobModal } from './components/JobModal';
import { JobCard } from './components/JobCard';
import { DeleteModal } from './components/DeleteModal';
import { getAllJobs, addJob, updateJob, deleteJob, importJobs } from './lib/db';
import seedData from './seed.json';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const COLUMNS = ['wishlist', 'applied', 'follow-up', 'interview', 'offer', 'rejected'];

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest
  const [filterStatus, setFilterStatus] = useState('all'); // all or specific status


  // Fetch initial data & seed if empty
  useEffect(() => {
    const fetchData = async () => {
      let allJobs = await getAllJobs();
      if (allJobs.length === 0 && seedData && seedData.length > 0) {
        console.log('Seeding initial data...');
        await importJobs(seedData);
        allJobs = await getAllJobs();
      }
      setJobs(allJobs);
    };
    fetchData();
  }, []);

  // Theme effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredJobs = useMemo(() => {
    let result = jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterStatus !== 'all') {
      result = result.filter(job => job.status === filterStatus);
    }

    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
    } else {
      result.sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied));
    }

    return result;
  }, [jobs, searchQuery, sortOrder, filterStatus]);

  const jobsByColumn = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col] = filteredJobs.filter((job) => job.status === col);
      return acc;
    }, {});
  }, [filteredJobs]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeJob = jobs.find((j) => j.id === activeId);
    if (!activeJob) return;

    if (COLUMNS.includes(overId)) {
      if (activeJob.status !== overId) {
        setJobs((prev) => 
          prev.map((j) => 
            j.id === activeId ? { ...j, status: overId } : j
          )
        );
        updateJob({ ...activeJob, status: overId });
      }
      return;
    }

    const overJob = jobs.find((j) => j.id === overId);
    if (overJob && activeJob.status !== overJob.status) {
      setJobs((prev) => 
        prev.map((j) => 
          j.id === activeId ? { ...j, status: overJob.status } : j
        )
      );
      updateJob({ ...activeJob, status: overJob.status });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const activeIndex = jobs.findIndex((j) => j.id === activeId);
      const overIndex = jobs.findIndex((j) => j.id === overId);

      if (overIndex !== -1) {
        setJobs((prev) => arrayMove(prev, activeIndex, overIndex));
      }
    }

    setActiveId(null);
  };

  const handleSaveJob = async (jobData) => {
    if (jobData.id) {
      const updated = await updateJob(jobData);
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    } else {
      const added = await addJob(jobData);
      setJobs((prev) => [...prev, added]);
    }
  };

  const handleDeleteJob = async (id) => {
    const job = jobs.find(j => j.id === id);
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      await deleteJob(jobToDelete.id);
      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
      setJobToDelete(null);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          await importJobs(imported);
          const allJobs = await getAllJobs();
          setJobs(allJobs);
          alert('Data imported successfully!');
        }
      } catch (err) {
        alert('Failed to import data. Please ensure the file is valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const activeJob = activeId ? jobs.find((j) => j.id === activeId) : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto flex h-16 items-center px-4 gap-4">
          <div className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
              <LayoutDashboard className="text-primary-foreground h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              Job<span className="text-muted-foreground font-medium">Flow</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-auto relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search companies or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-muted/40 border border-border/40 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-muted rounded-xl text-muted-foreground transition-all duration-300"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-border/60 mx-1 hidden sm:block" />
            <div className="hidden sm:flex gap-1.5">
              <button onClick={handleExport} className="p-2 hover:bg-muted rounded-xl text-muted-foreground transition-all group" title="Export JSON">
                <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <label className="p-2 hover:bg-muted rounded-xl text-muted-foreground transition-all cursor-pointer group" title="Import JSON">
                <Upload size={20} className="group-hover:translate-y-0.5 transition-transform" />
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>
            <button
              onClick={() => { setEditingJob(null); setIsModalOpen(true); }}
              className="ml-2 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={18} />
              <span className="hidden md:inline">Add Job</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-muted/10 border-b border-border/40 px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <Filter size={14} className="text-primary" />
            Active Filters: {searchQuery ? 'Search ON' : 'None'}
            <div className="h-4 w-px bg-border" />
            <ArrowUpDown size={14} className="text-primary" />
            Sort By: 
            <button onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')} className="text-primary hover:underline lowercase bg-primary/5 px-2 py-0.5 rounded">
              {sortOrder}
            </button>
          </div>
          <div className="text-xs text-muted-foreground">
            Total Applications: <span className="font-bold text-foreground">{jobs.length}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 bg-muted/5 border-b border-border/40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <button 
            onClick={() => setFilterStatus('all')}
            className={cn(
              "bg-background border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group overflow-hidden relative text-left",
              filterStatus === 'all' ? "border-primary ring-1 ring-primary" : "border-border/60"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl group-hover:scale-110 transition-transform", 
                filterStatus === 'all' ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              )}>
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground dark:text-slate-400 uppercase tracking-wider">Total</p>
                <p className="text-xl font-bold font-mono dark:text-white">{jobs.length}</p>
              </div>
            </div>
            <div className={cn(
              "absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:scale-125 transition-transform",
              filterStatus === 'all' ? "text-primary opacity-10" : ""
            )}>
              <Briefcase size={64} />
            </div>
          </button>

          { [
            { id: 'wishlist', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { id: 'applied', icon: Send, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
            { id: 'follow-up', icon: MessageCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { id: 'interview', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { id: 'offer', icon: Trophy, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { id: 'rejected', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          ].map((stat) => {
            const Icon = stat.icon;
            const count = jobs.filter(j => j.status === stat.id).length;
            const isActive = filterStatus === stat.id;
            return (
              <button 
                key={stat.id} 
                onClick={() => setFilterStatus(stat.id)}
                className={cn(
                  "bg-background border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group overflow-hidden relative text-left",
                  isActive ? "border-primary ring-1 ring-primary" : "border-border/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-xl group-hover:scale-110 transition-transform", 
                    isActive ? "bg-primary text-primary-foreground" : cn(stat.bg, stat.color)
                  )}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground dark:text-slate-400 uppercase tracking-wider">{stat.id === 'follow-up' ? 'Follow Up' : stat.id}</p>
                    <p className="text-xl font-bold font-mono dark:text-white">{count}</p>
                  </div>
                </div>
                <div className={cn(
                  "absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:scale-125 transition-transform",
                  isActive ? "text-primary opacity-10" : stat.color
                )}>
                  <Icon size={64} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex-1 overflow-x-auto p-6 bg-muted/5 kanban-scrollbar">
        <div className="flex h-[calc(100vh-12rem)] gap-6 min-w-max mx-auto max-w-[1800px]">
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            {COLUMNS.filter(colId => filterStatus === 'all' || filterStatus === colId).map((colId) => (
              <KanbanColumn key={colId} id={colId} jobs={jobsByColumn[colId] || []} onEdit={(job) => { setEditingJob(job); setIsModalOpen(true); }} onDelete={handleDeleteJob} />
            ))}
            <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }}>
              {activeJob ? <div className="w-[300px] pointer-events-none rotate-3 opacity-90"><JobCard job={activeJob} /></div> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>

      <footer className="h-10 border-t border-border/40 bg-background/50 flex items-center justify-center px-6">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Local-First Data • IndexedDB Persisted • JobTracker Pro v1.0</p>
      </footer>

      <JobModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingJob(null); }} onSave={handleSaveJob} job={editingJob} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={jobToDelete?.company} />
    </div>
  );
}

export default App;
