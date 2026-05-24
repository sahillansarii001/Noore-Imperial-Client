'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Check, Clock, Users, BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.getCourse(courseId);
        if (res.success) setCourse(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/academy/${courseId}`);
      return;
    }
    
    setEnrolling(true);
    try {
      const res = await api.enrollCourse(course.id);
      if (res.success) {
        addToast('Successfully enrolled in the course!', 'success');
        router.push('/dashboard/student');
      } else {
        addToast(res.message || 'Failed to enroll', 'error');
      }
    } catch (e) {
      addToast(e.message || 'Error occurred', 'error');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center bg-black"><Loader /></div>;
  if (!course) return <div className="min-h-screen pt-20 flex items-center justify-center bg-black text-ivory">Course not found</div>;

  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img 
          src={course.thumbnail || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop"} 
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <span className="font-montserrat text-gold text-xs uppercase tracking-[0.3em] border border-gold px-3 py-1 mb-6 inline-block">
              {course.level || 'Beginner to Advanced'}
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl text-ivory mb-6 max-w-4xl leading-tight">
              {course.title}
            </h1>
            <p className="font-poppins text-lg text-grey max-w-2xl">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Info */}
          <div className="flex-1">
            <h3 className="font-cormorant text-3xl text-gold mb-8 border-b border-white/10 pb-4">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {[
                "Fundamentals of Couture Construction",
                "Advanced Draping Techniques",
                "Fashion Illustration & Rendering",
                "Textile Science & Selection",
                "Building a Luxury Brand",
                "Marketing & Retail Strategies"
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-poppins text-sm text-ivory/80">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="font-cormorant text-3xl text-gold mb-8 border-b border-white/10 pb-4">Curriculum Overview</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((mod) => (
                <div key={mod} className="bg-[#111] p-6 border border-white/5">
                  <h4 className="font-montserrat text-sm tracking-widest uppercase text-ivory mb-2">Module {mod}</h4>
                  <p className="font-cormorant text-2xl text-gold mb-2">Design Fundamentals & Theory</p>
                  <p className="font-poppins text-sm text-grey">An introduction to the principles of design, color theory, and historical context of luxury fashion.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Enroll Card */}
          <div className="w-full lg:w-96">
            <div className="sticky top-28 bg-[#111] border border-gold/30 p-8">
              <div className="text-4xl font-cormorant text-ivory mb-2">
                {formatPrice(course.price)}
              </div>
              <p className="font-poppins text-xs text-grey mb-8">Includes all course materials and certification</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-ivory/80">
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="font-poppins text-sm">{course.duration_weeks || 12} Weeks Duration</span>
                </div>
                <div className="flex items-center gap-4 text-ivory/80">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <span className="font-poppins text-sm">Self-Paced Learning</span>
                </div>
                <div className="flex items-center gap-4 text-ivory/80">
                  <Users className="w-5 h-5 text-gold" />
                  <span className="font-poppins text-sm">Expert Mentorship</span>
                </div>
                <div className="flex items-center gap-4 text-ivory/80">
                  <GraduationCap className="w-5 h-5 text-gold" />
                  <span className="font-poppins text-sm">Official Certification</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full" 
                onClick={handleEnroll}
                disabled={enrolling}
                isLoading={enrolling}
              >
                Enroll Now
              </Button>
              <p className="text-center font-montserrat text-[10px] text-grey uppercase tracking-widest mt-4">
                14-Day Money-Back Guarantee
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
