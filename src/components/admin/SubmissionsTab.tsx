// import React from 'react';
// import { Search, X, RefreshCw, AlertCircle, Eye, Download, Trash2 } from 'lucide-react';
// import type { TabType } from '../../types/admin';
// import { formatDate } from '../../utils/adminHelpers';

// interface SubmissionsTabProps {
//   activeTab: TabType;
//   filteredItems: any[];
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   isLoading: boolean;
//   onViewItem: (item: any) => void;
//   onDeleteItem: (id: string) => void;
//   onDownloadResume: (type: string, id: string, filename: string) => void;
//   density?: 'compact' | 'comfortable';
// }

// export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({
//   activeTab,
//   filteredItems,
//   searchQuery,
//   setSearchQuery,
//   isLoading,
//   onViewItem,
//   onDeleteItem,
//   onDownloadResume,
//   density = 'comfortable',
// }) => {
//   const cellPadding = density === 'compact' ? 'py-2.5 px-5' : 'py-4 px-6';
//   const headerPadding = density === 'compact' ? 'py-3 px-5' : 'py-4 px-6';

//   return (
//     <div className="space-y-6 animate-fade-in font-sans">
      
//       {/* Search Toolbar */}
//       <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        
//         {/* Search input */}
//         <div className="relative flex-grow max-w-md">
//           <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
//             <Search className="w-4 h-4" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search records by keywords..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
//           />
//           {searchQuery && (
//             <button 
//               onClick={() => setSearchQuery('')}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
//             >
//               <X className="w-3.5 h-3.5" />
//             </button>
//           )}
//         </div>

//         {/* Count summary */}
//         <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold select-none">
//           {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />}
//           <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-700">
//             Total Results: <strong className="text-slate-900 font-bold">{filteredItems.length}</strong>
//           </span>
//         </div>
//       </div>

//       {/* Data Table */}
//       <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
//         {isLoading ? (
//           <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-500">
//             <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
//             <p className="text-sm font-semibold">Loading data from database...</p>
//           </div>
//         ) : filteredItems.length === 0 ? (
//           <div className="p-20 flex flex-col items-center justify-center gap-3 text-slate-400">
//             <AlertCircle className="w-10 h-10 text-slate-350" />
//             <p className="text-sm font-bold text-slate-700">No submissions matching criteria found.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
//                   {activeTab === 'contacts' && (
//                     <>
//                       <th className={headerPadding}>Name & Contact</th>
//                       <th className={headerPadding}>Company / Role</th>
//                       <th className={headerPadding}>Message Preview</th>
//                       <th className={headerPadding}>Submitted</th>
//                       <th className={`${headerPadding} text-right`}>Actions</th>
//                     </>
//                   )}
//                   {activeTab === 'services' && (
//                     <>
//                       <th className={headerPadding}>Name & Contact</th>
//                       <th className={headerPadding}>Company / Title</th>
//                       <th className={headerPadding}>Requested Service</th>
//                       <th className={headerPadding}>Submitted</th>
//                       <th className={`${headerPadding} text-right`}>Actions</th>
//                     </>
//                   )}
//                   {(activeTab === 'jobs' || activeTab === 'internships') && (
//                     <>
//                       <th className={headerPadding}>Applicant Name</th>
//                       <th className={headerPadding}>Contact Info</th>
//                       <th className={headerPadding}>Portfolio / Links</th>
//                       <th className={headerPadding}>Resume File</th>
//                       <th className={headerPadding}>Applied Date</th>
//                       <th className={`${headerPadding} text-right`}>Actions</th>
//                     </>
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-150 text-xs">
//                 {filteredItems.map((item) => (
//                   <tr key={item.id} className="hover:bg-slate-50/80 transition-all">
                    
//                     {/* Contacts format */}
//                     {activeTab === 'contacts' && (
//                       <>
//                         <td className={cellPadding}>
//                           <div>
//                             <p className="font-bold text-slate-900 text-sm">{item.firstName}</p>
//                             <p className="text-slate-500 mt-0.5">{item.email}</p>
//                             <p className="text-slate-400 text-[11px]">{item.phone}</p>
//                           </div>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="font-medium text-slate-700">{item.lastName || 'N/A'}</span>
//                         </td>
//                         <td className={cellPadding}>
//                           <p className="text-slate-600 line-clamp-2 max-w-xs">{item.message}</p>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-slate-500">{formatDate(item.createdAt)}</span>
//                         </td>
//                       </>
//                     )}

//                     {/* Services format */}
//                     {activeTab === 'services' && (
//                       <>
//                         <td className={cellPadding}>
//                           <div>
//                             <p className="font-bold text-slate-900 text-sm">{item.fullName}</p>
//                             <p className="text-slate-500 mt-0.5">{item.email}</p>
//                             <p className="text-slate-400 text-[11px]">{item.phone}</p>
//                           </div>
//                         </td>
//                         <td className={cellPadding}>
//                           <div>
//                             <p className="font-medium text-slate-700">{item.company || item.companyName || 'N/A'}</p>
//                             {item.jobTitle && <p className="text-slate-400 text-[11px]">{item.jobTitle}</p>}
//                           </div>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
//                             {item.service || item.serviceNeeded || 'N/A'}
//                           </span>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-slate-500">{formatDate(item.createdAt)}</span>
//                         </td>
//                       </>
//                     )}

//                     {/* Careers & Internships format */}
//                     {(activeTab === 'jobs' || activeTab === 'internships') && (
//                       <>
//                         <td className={cellPadding}>
//                           <p className="font-bold text-slate-900 text-sm">{item.fullName}</p>
//                         </td>
//                         <td className={cellPadding}>
//                           <p className="text-slate-700">{item.email}</p>
//                           <p className="text-slate-400 text-[11px]">{item.phone}</p>
//                         </td>
//                         <td className={cellPadding}>
//                           {item.linkedinUrl ? (
//                             <a 
//                               href={item.linkedinUrl} 
//                               target="_blank" 
//                               rel="noreferrer"
//                               className="text-blue-600 hover:underline block truncate max-w-xs font-semibold"
//                             >
//                               LinkedIn Profile
//                             </a>
//                           ) : (
//                             <span className="text-slate-400 italic">None</span>
//                           )}
//                         </td>
//                         <td className={cellPadding}>
//                           {item.resumeName ? (
//                             <button
//                               onClick={() => onDownloadResume(activeTab, item.id, item.resumeName)}
//                               className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-all"
//                             >
//                               <Download className="w-3.5 h-3.5 text-amber-600" />
//                               Resume
//                             </button>
//                           ) : (
//                             <span className="text-slate-400 italic">No File</span>
//                           )}
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-slate-500">{formatDate(item.createdAt)}</span>
//                         </td>
//                       </>
//                     )}

//                     {/* Actions Column */}
//                     <td className={`${cellPadding} text-right`}>
//                       <div className="flex items-center justify-end gap-1.5">
//                         <button
//                           onClick={() => onViewItem(item)}
//                           title="View Details"
//                           className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => onDeleteItem(item.id)}
//                           title="Delete Record"
//                           className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




// import React from 'react';
// import { Search, X, RefreshCw, AlertCircle, Eye, Download, Trash2 } from 'lucide-react';
// import type { TabType } from '../../types/admin';
// import { formatDate } from '../../utils/adminHelpers';

// // Comprehensive TypeScript structure matching all form inputs from your images
// interface SubmissionItem {
//   id: string;
//   createdAt: string;
  
//   // Shared fields
//   email: string;
//   phone: string;
  
//   // Contact Tab fields
//   firstName?: string;
//   lastName?: string; // Maps to Company Name in Contact layout
//   subject?: string;
//   message?: string;
  
//   // Services Tab fields
//   fullName?: string;
//   company?: string;
//   companyName?: string;
//   jobTitle?: string;
//   service?: string;
//   serviceNeeded?: string;
//   budgetRange?: string;
//   timeline?: string;
//   projectDetails?: string;
  
//   // Jobs & Internships Tab fields
//   position?: string;
//   coverLetter?: string;
//   linkedinUrl?: string;
//   resumeName?: string;
// }

// interface SubmissionsTabProps {
//   activeTab: TabType;
//   filteredItems: SubmissionItem[];
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   isLoading: boolean;
//   onViewItem: (item: SubmissionItem) => void;
//   onDeleteItem: (id: string) => void;
//   onDownloadResume: (type: string, id: string, filename: string) => void;
//   density?: 'compact' | 'comfortable';
// }

// export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({
//   activeTab,
//   filteredItems,
//   searchQuery,
//   setSearchQuery,
//   isLoading,
//   onViewItem,
//   onDeleteItem,
//   onDownloadResume,
//   density = 'comfortable',
// }) => {
//   const cellPadding = density === 'compact' ? 'py-2.5 px-5' : 'py-4 px-6';
//   const headerPadding = density === 'compact' ? 'py-3 px-5' : 'py-4 px-6';

//   return (
//     <div className="space-y-6 animate-fade-in font-sans">
      
//       {/* Search Toolbar */}
//       <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        
//         {/* Search input */}
//         <div className="relative flex-grow max-w-md">
//           <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
//             <Search className="w-4 h-4" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search records by keywords..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
//           />
//           {searchQuery && (
//             <button 
//               onClick={() => setSearchQuery('')}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
//             >
//               <X className="w-3.5 h-3.5" />
//             </button>
//           )}
//         </div>

//         {/* Count summary */}
//         <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold select-none">
//           {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />}
//           <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-700">
//             Total Results: <strong className="text-slate-900 font-bold">{filteredItems.length}</strong>
//           </span>
//         </div>
//       </div>

//       {/* Data Table */}
//       <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
//         {isLoading ? (
//           <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-500">
//             <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
//             <p className="text-sm font-semibold">Loading data from database...</p>
//           </div>
//         ) : filteredItems.length === 0 ? (
//           <div className="p-20 flex flex-col items-center justify-center gap-3 text-slate-400">
//             <AlertCircle className="w-10 h-10 text-slate-350" />
//             <p className="text-sm font-bold text-slate-700">No submissions matching criteria found.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
//                   {activeTab === 'contacts' && (
//                     <>
//                       <th className={headerPadding}>Name & Contact</th>
//                       <th className={headerPadding}>Company / Role</th>
//                       <th className={headerPadding}>Message Preview</th>
//                       <th className={headerPadding}>Submitted</th>
//                       <th className={`${headerPadding} text-right`}>Actions</th>
//                     </>
//                   )}
//                   {activeTab === 'services' && (
//                     <>
//                       <th className={headerPadding}>Name & Contact</th>
//                       <th className={headerPadding}>Company / Title</th>
//                       <th className={headerPadding}>Requested Service</th>
//                       <th className={headerPadding}>Submitted</th>
//                       <th className={`${headerPadding} text-right`}>Actions</th>
//                     </>
//                   )}
//                   {(activeTab === 'jobs' || activeTab === 'internships') && (
//                     <>
//                       <th className={headerPadding}>Applicant Name</th>
//                       <th className={headerPadding}>Contact Info</th>
//                       <th className={headerPadding}>Portfolio / Links</th>
//                       <th className={headerPadding}>Resume File</th>
//                       <th className={headerPadding}>Applied Date</th>
//                       <th className={`${headerPadding} text-right`}>Actions</th>
//                     </>
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-150 text-xs">
//                 {filteredItems.map((item) => (
//                   <tr key={item.id} className="hover:bg-slate-50/80 transition-all">
                    
//                     {/* Contacts format */}
//                     {activeTab === 'contacts' && (
//                       <>
//                         <td className={cellPadding}>
//                           <div>
//                             <p className="font-bold text-slate-900 text-sm">{item.firstName}</p>
//                             <p className="text-slate-500 mt-0.5">{item.email}</p>
//                             <p className="text-slate-400 text-[11px]">{item.phone}</p>
//                           </div>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="font-medium text-slate-700">{item.lastName || 'N/A'}</span>
//                         </td>
//                         <td className={cellPadding}>
//                           <p className="text-slate-600 line-clamp-2 max-w-xs">{item.message}</p>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-slate-500">{formatDate(item.createdAt)}</span>
//                         </td>
//                       </>
//                     )}

//                     {/* Services format */}
//                     {activeTab === 'services' && (
//                       <>
//                         <td className={cellPadding}>
//                           <div>
//                             <p className="font-bold text-slate-900 text-sm">{item.fullName}</p>
//                             <p className="text-slate-500 mt-0.5">{item.email}</p>
//                             <p className="text-slate-400 text-[11px]">{item.phone}</p>
//                           </div>
//                         </td>
//                         <td className={cellPadding}>
//                           <div>
//                             <p className="font-medium text-slate-700">{item.company || item.companyName || 'N/A'}</p>
//                             {item.jobTitle && <p className="text-slate-400 text-[11px]">{item.jobTitle}</p>}
//                           </div>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
//                             {item.service || item.serviceNeeded || 'N/A'}
//                           </span>
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-slate-500">{formatDate(item.createdAt)}</span>
//                         </td>
//                       </>
//                     )}

//                     {/* Careers & Internships format */}
//                     {(activeTab === 'jobs' || activeTab === 'internships') && (
//                       <>
//                         <td className={cellPadding}>
//                           <p className="font-bold text-slate-900 text-sm">{item.fullName}</p>
//                         </td>
//                         <td className={cellPadding}>
//                           <p className="text-slate-700">{item.email}</p>
//                           <p className="text-slate-400 text-[11px]">{item.phone}</p>
//                         </td>
//                         <td className={cellPadding}>
//                           {item.linkedinUrl ? (
//                             <a 
//                               href={item.linkedinUrl} 
//                               target="_blank" 
//                               rel="noreferrer"
//                               className="text-blue-600 hover:underline block truncate max-w-xs font-semibold"
//                             >
//                               LinkedIn Profile
//                             </a>
//                           ) : (
//                             <span className="text-slate-400 italic">None</span>
//                           )}
//                         </td>
//                         <td className={cellPadding}>
//                           {item.resumeName ? (
//                             <button
//                               onClick={() => onDownloadResume(activeTab, item.id, item.resumeName!)}
//                               className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-all"
//                             >
//                               <Download className="w-3.5 h-3.5 text-amber-600" />
//                               Resume
//                             </button>
//                           ) : (
//                             <span className="text-slate-400 italic">No File</span>
//                           )}
//                         </td>
//                         <td className={cellPadding}>
//                           <span className="text-slate-500">{formatDate(item.createdAt)}</span>
//                         </td>
//                       </>
//                     )}

//                     {/* Actions Column */}
//                     <td className={`${cellPadding} text-right`}>
//                       <div className="flex items-center justify-end gap-1.5">
//                         <button
//                           onClick={() => onViewItem(item)}
//                           title="View Details"
//                           className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => onDeleteItem(item.id)}
//                           title="Delete Record"
//                           className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




import React from 'react';
import { Search, X, RefreshCw, AlertCircle, Eye, Download, Trash2, Edit2 } from 'lucide-react';
import type { TabType } from '../../types/admin';
import { formatDate } from '../../utils/adminHelpers';

interface SubmissionItem {
  id: string;
  createdAt: string;
  
  // Shared fields
  email: string;
  phone: string;
  
  // Contact Tab fields
  firstName?: string;
  lastName?: string;
  subject?: string;
  message?: string;
  
  // Services Tab fields
  fullName?: string;
  company?: string;
  companyName?: string;
  jobTitle?: string;
  service?: string;
  serviceNeeded?: string;
  budgetRange?: string;
  timeline?: string;
  projectDetails?: string;
  
  // Jobs & Internships Tab fields
  position?: string;
  coverLetter?: string;
  linkedinUrl?: string;
  resumeName?: string;
}

interface SubmissionsTabProps {
  activeTab: TabType;
  filteredItems: SubmissionItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  onViewItem: (item: any) => void;
  onEditItem?: (item: any) => void;
  onDeleteItem: (id: string) => void;
  onDownloadResume: (type: string, id: string, filename: string) => void;
  density?: 'compact' | 'comfortable';
}

export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({
  activeTab,
  filteredItems,
  searchQuery,
  setSearchQuery,
  isLoading,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onDownloadResume,
  density = 'comfortable',
}) => {
  const cellPadding = density === 'compact' ? 'py-2.5 px-5' : 'py-4 px-6';
  const headerPadding = density === 'compact' ? 'py-3 px-5' : 'py-4 px-6';

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        
        {/* Search input */}
        <div className="relative flex-grow max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search records by keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Count summary */}
        <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold select-none">
          {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />}
          <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-700">
            Total Results: <strong className="text-slate-900 font-bold">{filteredItems.length}</strong>
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
            <p className="text-sm font-semibold">Loading data from database...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <AlertCircle className="w-10 h-10 text-slate-350" />
            <p className="text-sm font-bold text-slate-700">No submissions matching criteria found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                  {activeTab === 'contacts' && (
                    <>
                      <th className={headerPadding}>Name & Contact</th>
                      <th className={headerPadding}>Company / Role</th>
                      <th className={headerPadding}>Message Preview</th>
                      <th className={headerPadding}>Submitted</th>
                      <th className={`${headerPadding} text-right`}>Actions</th>
                    </>
                  )}
                  {activeTab === 'services' && (
                    <>
                      <th className={headerPadding}>Name & Contact</th>
                      <th className={headerPadding}>Company / Title</th>
                      <th className={headerPadding}>Requested Service</th>
                      <th className={headerPadding}>Submitted</th>
                      <th className={`${headerPadding} text-right`}>Actions</th>
                    </>
                  )}
                  {(activeTab === 'jobs' || activeTab === 'internships') && (
                    <>
                      <th className={headerPadding}>Applicant Name</th>
                      <th className={headerPadding}>Contact Info</th>
                      <th className={headerPadding}>Portfolio / Links</th>
                      <th className={headerPadding}>Resume File</th>
                      <th className={headerPadding}>Applied Date</th>
                      <th className={`${headerPadding} text-right`}>Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-all">
                    
                    {/* Contacts format */}
                    {activeTab === 'contacts' && (
                      <>
                        <td className={cellPadding}>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{item.firstName}</p>
                            <p className="text-slate-500 mt-0.5">{item.email}</p>
                            <p className="text-slate-400 text-[11px]">{item.phone}</p>
                          </div>
                        </td>
                        <td className={cellPadding}>
                          <span className="font-medium text-slate-700">{item.lastName || 'N/A'}</span>
                        </td>
                        <td className={cellPadding}>
                          <p className="text-slate-600 line-clamp-2 max-w-xs">{item.message}</p>
                        </td>
                        <td className={cellPadding}>
                          <span className="text-slate-500">{formatDate(item.createdAt)}</span>
                        </td>
                      </>
                    )}

                    {/* Services format */}
                    {activeTab === 'services' && (
                      <>
                        <td className={cellPadding}>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{item.fullName}</p>
                            <p className="text-slate-500 mt-0.5">{item.email}</p>
                            <p className="text-slate-400 text-[11px]">{item.phone}</p>
                          </div>
                        </td>
                        <td className={cellPadding}>
                          <div>
                            <p className="font-medium text-slate-700">{item.company || item.companyName || 'N/A'}</p>
                            {item.jobTitle && <p className="text-slate-400 text-[11px]">{item.jobTitle}</p>}
                          </div>
                        </td>
                        <td className={cellPadding}>
                          <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            {item.service || item.serviceNeeded || 'N/A'}
                          </span>
                        </td>
                        <td className={cellPadding}>
                          <span className="text-slate-500">{formatDate(item.createdAt)}</span>
                        </td>
                      </>
                    )}

                    {/* Careers & Internships format */}
                    {(activeTab === 'jobs' || activeTab === 'internships') && (
                      <>
                        <td className={cellPadding}>
                          <p className="font-bold text-slate-900 text-sm">{item.fullName}</p>
                        </td>
                        <td className={cellPadding}>
                          <p className="text-slate-700">{item.email}</p>
                          <p className="text-slate-400 text-[11px]">{item.phone}</p>
                        </td>
                        <td className={cellPadding}>
                          {item.linkedinUrl ? (
                            <a 
                              href={item.linkedinUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-blue-600 hover:underline block truncate max-w-xs font-semibold"
                            >
                              LinkedIn Profile
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">None</span>
                          )}
                        </td>
                        <td className={cellPadding}>
                          {item.resumeName ? (
                            <button
                              onClick={() => onDownloadResume(activeTab, item.id, item.resumeName!)}
                              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-all"
                            >
                              <Download className="w-3.5 h-3.5 text-amber-600" />
                              Resume
                            </button>
                          ) : (
                            <span className="text-slate-400 italic">No File</span>
                          )}
                        </td>
                        <td className={cellPadding}>
                          <span className="text-slate-500">{formatDate(item.createdAt)}</span>
                        </td>
                      </>
                    )}

                    {/* Actions Column */}
                    <td className={`${cellPadding} text-right`}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewItem(item)}
                          title="View Details"
                          className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {onEditItem && (
                          <button
                            onClick={() => onEditItem(item)}
                            title="Edit Record"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          title="Delete Record"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};