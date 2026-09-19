import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminMessagesPage() {
  const messages: never[] = []; // Will be populated from Supabase

  return (
    <div>
      <AdminTopbar
        title="Messages"
        description="Contact form submissions from the public website."
      />

      {messages.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5DDD4] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F7F3ED] border-b border-[#E5DDD4]">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Message</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5DDD4] p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.019z" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[#171717] mb-2">No Messages Yet</h3>
          <p className="text-sm text-[#6B6B6B] max-w-xs mx-auto">
            Messages from the contact form will appear here once Supabase is connected and customers submit inquiries.
          </p>
        </div>
      )}
    </div>
  );
}
