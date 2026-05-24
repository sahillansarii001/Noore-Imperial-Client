'use client';
import { BookOpen, Users, ClipboardList, Video, FileText, BarChart3 } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardStats from '@/components/dashboard/DashboardStats';

const sidebarLinks = [
  { href: '/dashboard/faculty', icon: BarChart3, label: 'Overview' },
  { href: '/dashboard/faculty/courses', icon: BookOpen, label: 'My Courses' },
  { href: '/dashboard/faculty/students', icon: Users, label: 'Students' },
  { href: '/dashboard/faculty/live-classes', icon: Video, label: 'Live Classes' },
  { href: '/dashboard/faculty/assignments', icon: ClipboardList, label: 'Assignments' },
  { href: '/dashboard/faculty/materials', icon: FileText, label: 'Materials' },
];

const STATS = [
  { label: 'Active Courses', value: 3, change: 0, icon: BookOpen },
  { label: 'Total Students', value: 284, change: 15, icon: Users },
  { label: 'Pending Reviews', value: 12, change: -3, icon: ClipboardList },
  { label: 'Avg Course Rating', value: 48, suffix: '/50', change: 1, icon: BarChart3 },
];

const COURSES = [
  { id: 1, title: 'Professional Fashion Design', students: 124, progress: 68, nextClass: '2025-05-26 3:00 PM' },
  { id: 2, title: 'Bridal Couture Masterclass', students: 89, progress: 45, nextClass: '2025-05-27 11:00 AM' },
  { id: 3, title: 'Indo-Western Fusion Design', students: 71, progress: 30, nextClass: '2025-05-28 2:00 PM' },
];

export default function FacultyDashboard() {
  return (
    <div className="flex min-h-screen bg-[#FAF6F0]">
      <Sidebar links={sidebarLinks} subtitle="Faculty Portal" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <p className="font-montserrat text-[0.6rem] tracking-[0.3em] uppercase text-[#8A8A8A]">Faculty Dashboard</p>
          <h1 className="font-cormorant text-4xl font-light text-[#0A0A0A]">Teaching Overview</h1>
        </div>
        <div className="space-y-6">
          <DashboardStats stats={STATS} />
          <div className="dashboard-card">
            <h3 className="font-cormorant text-xl font-medium text-[#0A0A0A] mb-5">My Courses</h3>
            <div className="space-y-4">
              {COURSES.map(course => (
                <div key={course.id} className="p-4 bg-[#FAF6F0] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-cormorant text-lg font-medium text-[#0A0A0A]">{course.title}</h4>
                    <span className="font-poppins text-xs text-[#8A8A8A]">{course.students} students</span>
                  </div>
                  <p className="font-poppins text-xs text-[#8A8A8A] mb-2">Next class: {course.nextClass}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#E8E0D4] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#A07830] to-[#C9A84C] rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="font-montserrat text-[0.6rem] text-[#C9A84C]">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
