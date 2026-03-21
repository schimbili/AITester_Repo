import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Linkedin, Calendar, Edit2, Trash2, Briefcase, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const statusColors = {
  wishlist: 'border-l-indigo-400 dark:border-l-indigo-500',
  applied: 'border-l-blue-400 dark:border-l-blue-500',
  'follow-up': 'border-l-yellow-400 dark:border-l-yellow-500',
  interview: 'border-l-purple-400 dark:border-l-purple-500',
  offer: 'border-l-green-400 dark:border-l-green-500',
  rejected: 'border-l-rose-400 dark:border-l-rose-500',
};

export const JobCard = ({ job, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const daysSince = formatDistanceToNow(new Date(job.dateApplied), { addSuffix: true });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group bg-card text-card-foreground p-4 mb-3 rounded-lg border border-border border-l-4 shadow-sm hover:shadow-md transition-all cursor-default select-none group',
        statusColors[job.status] || 'border-l-muted',
        isDragging && 'opacity-50 scale-105 z-50 ring-2 ring-primary'
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0" {...attributes} {...listeners}>
          <h4 className="font-bold text-sm truncate dark:text-white drop-shadow-sm">{job.company}</h4>
          <p className="text-xs font-medium text-muted-foreground dark:text-slate-300 truncate tracking-wide">{job.title}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(job)}
            className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors"
          >
            <Edit2 size={12} />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-1 hover:bg-destructive/10 hover:text-destructive rounded text-muted-foreground transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 pointer-events-none">
        {job.resumeUsed && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground border border-border">
            {job.resumeUsed}
          </span>
        )}
        {job.salaryRange && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
            <DollarSign size={8} className="mr-0.5" />
            {job.salaryRange}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center text-[10px] text-muted-foreground">
          <Calendar size={10} className="mr-1" />
          {daysSince}
        </div>
        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Linkedin size={14} />
          </a>
        )}
      </div>
    </div>
  );
};
