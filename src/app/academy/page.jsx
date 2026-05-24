'use client';
import { useState, useEffect } from 'react';
import CategoryBanner from '@/components/shop/CategoryBanner';
import CourseCard from '@/components/academy/CourseCard';
import { api } from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { motion } from 'framer-motion';

export default function AcademyPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) setCourses(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20">
      <CategoryBanner title="The Academy" breadcrumb={false} />
      
      {/* Intro */}
      <section className="py-24 border-b border-white/10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="font-montserrat text-gold tracking-[0.3em] uppercase text-xs mb-4 block">Master The Craft</span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-6">Where Passion Meets Precision</h2>
          <p className="font-poppins text-grey text-lg leading-relaxed">
            The Noore Imperial Academy offers world-class education in fashion design, styling, and business management. 
            Learn from industry veterans and gain the skills required to launch your own successful luxury brand.
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h3 className="font-cormorant text-3xl text-gold mb-12">Available Programs</h3>
          
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
              {courses.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-grey font-poppins">No courses available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
