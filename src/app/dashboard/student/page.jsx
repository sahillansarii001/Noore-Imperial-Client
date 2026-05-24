'use client';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { BookOpen, Award, CheckCircle, FileText, User, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';

function StudentDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const activeTab = searchParams ? searchParams.get('tab') : null;

  // Settings form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const stats = [
    { label: 'Active Courses', value: '2', icon: BookOpen },
    { label: 'Completed Modules', value: '14', icon: CheckCircle },
    { label: 'Certifications', value: '1', icon: Award },
  ];

  const courses = [
    { id: 1, title: 'Fashion Design & Illustration', progress: 65, nextModule: 'Advanced Draping' },
    { id: 2, title: 'Boutique Management', progress: 30, nextModule: 'Retail Accounting' },
  ];

  const assignments = [
    { id: 1, title: 'Draping Tech Pack Submission', course: 'Fashion Design & Illustration', due: '2026-06-01', status: 'Pending' },
    { id: 2, title: 'Retail Floor Layout Design', course: 'Boutique Management', due: '2026-05-20', status: 'Submitted' },
  ];

  // 1. Courses View
  if (activeTab === 'courses') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">My Courses</h1>
          <p className="font-poppins text-grey text-xs">Access your enrolled programs, syllabus, and live academy lectures.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-[#0F0F0F] p-6 border border-white/5 flex flex-col justify-between group hover:border-gold/20 transition-all duration-500">
              <div>
                <h4 className="font-cormorant text-2xl text-ivory/95 tracking-wide mb-2">{course.title}</h4>
                <p className="font-poppins text-xs text-grey mb-6">Next: {course.nextModule}</p>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-montserrat uppercase tracking-[0.25em] text-gold">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold transition-all duration-500" style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              <button className="w-full py-3.5 border border-gold/30 text-gold hover:bg-gold hover:text-black hover:border-gold font-montserrat text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Assignments View
  if (activeTab === 'assignments') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Assignments</h1>
          <p className="font-poppins text-grey text-xs">Submit creative portfolios and review grading states.</p>
        </div>

        <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-poppins text-xs">
              <thead className="bg-[#070707] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Assignment</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Course</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Due Date</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Status</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assignments.map((asm) => (
                  <tr key={asm.id} className="hover:bg-white/[0.01] transition-all duration-300">
                    <td className="px-6 py-4.5 text-ivory/95 font-medium">{asm.title}</td>
                    <td className="px-6 py-4.5 text-grey font-light">{asm.course}</td>
                    <td className="px-6 py-4.5 text-grey">{asm.due}</td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-montserrat uppercase tracking-wider ${
                        asm.status === 'Submitted' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {asm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <button className="text-gold hover:text-ivory transition-colors duration-300 text-[10px] tracking-[0.2em] uppercase font-montserrat underline underline-offset-4">
                        {asm.status === 'Submitted' ? 'View' : 'Upload'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 3. Settings View
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Student Profile</h1>
          <p className="font-poppins text-grey text-xs">Update your student details and change passcode.</p>
        </div>
        
        <div className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2 text-gold">
            <User className="w-4 h-4" />
            <h3 className="font-cormorant text-xl tracking-wider uppercase">Academy Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Student Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Registered Email</label>
              <input 
                type="email" 
                value={email} 
                disabled
                className="w-full bg-black/10 border border-white/5 p-3 text-xs font-poppins text-grey/60 cursor-not-allowed"
              />
            </div>
          </div>
          
          <Button variant="primary" className="text-[10px] tracking-[0.2em] font-semibold w-full sm:w-auto self-start mt-2">
            Save Changes
          </Button>
        </div>

        <div className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2 text-gold">
            <Lock className="w-4 h-4" />
            <h3 className="font-cormorant text-xl tracking-wider uppercase">Security</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Current Password</label>
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">New Password</label>
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
          </div>
          
          <Button variant="secondary" className="text-[10px] tracking-[0.2em] font-semibold w-full sm:w-auto self-start mt-2">
            Change Password
          </Button>
        </div>
      </div>
    );
  }

  // Default Student Dashboard View
  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="font-cormorant text-4xl text-ivory mb-2">Student Portal</h1>
        <p className="font-poppins text-grey text-xs">Welcome back, {user?.name}. Continue your learning journey.</p>
      </div>

      <DashboardStats stats={stats} />

      <div>
        <h3 className="font-cormorant text-2xl text-gold mb-6 border-b border-white/5 pb-4 uppercase tracking-wider">My Learning</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-[#0F0F0F] p-6 border border-white/5 flex flex-col justify-between group hover:border-gold/20 transition-all duration-500">
              <div>
                <h4 className="font-cormorant text-2xl text-ivory/95 tracking-wide mb-2">{course.title}</h4>
                <p className="font-poppins text-xs text-grey mb-6">Next: {course.nextModule}</p>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-montserrat uppercase tracking-[0.25em] text-gold">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold transition-all duration-500" style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              <button className="w-full py-3.5 border border-gold/30 text-gold hover:bg-gold hover:text-black hover:border-gold font-montserrat text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <Suspense fallback={<div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading student portal...</div>}>
      <StudentDashboardContent />
    </Suspense>
  );
}
