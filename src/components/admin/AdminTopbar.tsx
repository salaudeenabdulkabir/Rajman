"use client";

interface AdminTopbarProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminTopbar({ title, description, action }: AdminTopbarProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-[#E5DDD4]">
      <div>
        <h1 className="text-xl font-bold text-[#171717] font-heading">{title}</h1>
        {description && (
          <p className="text-sm text-[#6B6B6B] mt-1">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
