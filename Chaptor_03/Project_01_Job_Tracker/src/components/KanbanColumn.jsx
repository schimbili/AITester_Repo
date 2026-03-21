import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { JobCard } from './JobCard';
import { MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const columnTitles = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  'follow-up': 'Follow-up',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};

const columnColors = {
  wishlist: 'bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
  applied: 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900',
  'follow-up': 'bg-yellow-50/50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900',
  interview: 'bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900',
  offer: 'bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900',
  rejected: 'bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900',
};

export const KanbanColumn = ({ id, jobs, onEdit, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full min-w-[300px] max-w-[350px] bg-muted/30 rounded-xl border border-border/50 overflow-hidden shadow-sm group">
      <div className={cn(
        "flex items-center justify-between p-4 border-b border-border/50 transition-colors",
        columnColors[id] || 'bg-background text-foreground'
      )}>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm uppercase tracking-wider">{columnTitles[id]}</h3>
          <span className="flex items-center justify-center px-1.5 py-0.5 min-w-[20px] rounded-full text-[10px] font-bold bg-white/50 dark:bg-black/20 shadow-sm border border-black/5 dark:border-white/5">
            {jobs.length}
          </span>
        </div>
        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 p-3 overflow-y-auto kanban-scrollbar transition-all duration-200 ease-in-out",
          isOver && "bg-primary/5 scale-[1.01] ring-2 ring-primary/20 ring-inset rounded-b-xl"
        )}
      >
        <SortableContext items={jobs.map((job) => job.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
          ))}
          {jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border/60 rounded-xl text-muted-foreground/40 mt-2 hover:border-border/80 hover:text-muted-foreground/60 transition-all cursor-default group/empty">
              <span className="text-xs font-medium">Drop cards here</span>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};
