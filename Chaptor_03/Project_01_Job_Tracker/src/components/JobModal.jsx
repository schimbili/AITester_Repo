import React, { useState, useEffect } from 'react';
import { X, Briefcase, Globe, FileText, Calendar, DollarSign, Notebook, Layers } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const statusOptions = [
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'applied', label: 'Applied' },
  { id: 'follow-up', label: 'Follow-up' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'rejected', label: 'Rejected' },
];

export const JobModal = ({ isOpen, onClose, onSave, job }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    jobUrl: '',
    resumeUsed: '',
    dateApplied: new Date().toISOString().split('T')[0],
    salaryRange: '',
    notes: '',
    status: 'wishlist',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        dateApplied: new Date(job.dateApplied).toISOString().split('T')[0],
      });
    } else {
      setFormData({
        company: '',
        title: '',
        jobUrl: '',
        resumeUsed: '',
        dateApplied: new Date().toISOString().split('T')[0],
        salaryRange: '',
        notes: '',
        status: 'wishlist',
      });
    }
    setErrors({});
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="bg-card w-full max-w-xl rounded-2xl shadow-2xl border border-border/60 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border/40 bg-muted/30">
          <h2 className="text-xl font-bold tracking-tight">
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh] kanban-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Briefcase size={12} /> Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google, Facebook..."
                className={cn(
                  "w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.company && "border-destructive text-destructive bg-destructive/5 placeholder:text-destructive/50"
                )}
              />
              {errors.company && <p className="text-[10px] font-medium text-destructive mt-0.5">{errors.company}</p>}
            </div>

            {/* Job Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers size={12} /> Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Software Engineer, QA..."
                className={cn(
                  "w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.title && "border-destructive text-destructive bg-destructive/5 placeholder:text-destructive/50"
                )}
              />
              {errors.title && <p className="text-[10px] font-medium text-destructive mt-0.5">{errors.title}</p>}
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Globe size={12} /> LinkedIn URL
              </label>
              <input
                type="url"
                name="jobUrl"
                value={formData.jobUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/jobs/..."
                className="w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Resume Used */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText size={12} /> Resume Used
              </label>
              <input
                type="text"
                name="resumeUsed"
                list="resume-suggestions"
                value={formData.resumeUsed}
                onChange={handleChange}
                placeholder="SDE_Resume_v3..."
                className="w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <datalist id="resume-suggestions">
                <option value="SDE_Resume_v3" />
                <option value="QA_Lead_Resume" />
                <option value="FullStack_Resume" />
              </datalist>
            </div>

            {/* Date Applied */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Calendar size={12} /> Date Applied
              </label>
              <input
                type="date"
                name="dateApplied"
                value={formData.dateApplied}
                onChange={handleChange}
                className="w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <DollarSign size={12} /> Salary Range
              </label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="e.g. ₹25-30 LPA or $150K"
                className="w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers size={12} /> Current Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, status: opt.id }))}
                    className={cn(
                      "flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium border border-border/60 transition-all",
                      formData.status === opt.id 
                        ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                        : "bg-background text-muted-foreground hover:bg-muted/50 hover:border-border"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Notebook size={12} /> Notes & Referral Info
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Recruiter contact, referral name, etc..."
              className="w-full bg-background border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border font-medium text-sm hover:bg-muted transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/10 transition-all"
            >
              {job ? 'Update Tracker' : 'Save Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
