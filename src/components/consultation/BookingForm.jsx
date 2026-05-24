'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import ExpertCard from './ExpertCard';
import CalendarPicker from './CalendarPicker';
import InspirationUpload from './InspirationUpload';
import Modal from '@/components/ui/Modal';
import { useConsultation } from '@/hooks/useConsultation';
import { useAuth } from '@/hooks/useAuth';

export default function BookingForm() {
  const { isAuthenticated } = useAuth();
  const { experts, branches, loadExperts, loadBranches, bookConsultation, loading } = useConsultation();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    expertId: null,
    branchId: null,
    date: null,
    time: '',
    budget: '',
    inspiration: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadExperts();
    loadBranches();
  }, [loadExperts, loadBranches]);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') window.location.href = '/auth/login?redirect=/consultation/book';
      return;
    }
    
    try {
      const data = {
        expert_id: formData.expertId,
        branch_id: formData.branchId,
        type: formData.type,
        scheduled_at: new Date(`${formData.date.toISOString().split('T')[0]}T${formData.time}`).toISOString(),
        budget: formData.budget ? parseInt(formData.budget) * 100 : null,
      };
      await bookConsultation(data);
      setShowSuccess(true);
    } catch (err) {
      alert('Failed to book: ' + err.message);
    }
  };

  const steps = [
    { title: 'Consultation Type' },
    { title: 'Select Stylist' },
    { title: 'Date & Branch' },
    { title: 'Details' },
    { title: 'Review' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2 bg-black px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-cormorant text-lg transition-colors ${
              step > i + 1 ? 'bg-gold border-gold text-black' : step === i + 1 ? 'border-gold text-gold' : 'border-white/20 text-grey'
            }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`font-montserrat text-[10px] uppercase tracking-widest hidden md:block ${
              step === i + 1 ? 'text-gold' : 'text-grey'
            }`}>{s.title}</span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-12 min-h-[500px]">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-cormorant text-3xl text-ivory mb-8 text-center">What type of consultation are you looking for?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Bridal Trousseau', 'Bespoke Evening Wear', 'Personal Styling', 'Virtual Consultation'].map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={`p-8 border flex items-center justify-center font-montserrat text-sm tracking-widest uppercase transition-all ${
                    formData.type === type ? 'border-gold bg-gold/5 text-gold' : 'border-white/10 hover:border-gold/50 text-ivory'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-cormorant text-3xl text-ivory mb-8 text-center">Select Your Stylist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {experts.map(expert => (
                <ExpertCard 
                  key={expert.id} 
                  expert={expert} 
                  selected={formData.expertId === expert.id}
                  onSelect={(e) => setFormData({ ...formData, expertId: e.id })}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h3 className="font-cormorant text-2xl text-ivory mb-6">Select Date</h3>
              <CalendarPicker selectedDate={formData.date} onSelect={(d) => setFormData({ ...formData, date: d })} />
            </div>
            
            <div className="flex-1 flex flex-col gap-8">
              <div>
                <h3 className="font-cormorant text-2xl text-ivory mb-6">Select Time</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-3 border text-xs font-montserrat transition-colors ${
                        formData.time === time ? 'border-gold bg-gold text-black' : 'border-white/20 text-ivory hover:border-gold'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-cormorant text-2xl text-ivory mb-6">Select Location</h3>
                <select 
                  className="w-full bg-[#111] border border-white/20 p-4 text-ivory font-poppins focus:border-gold focus:outline-none"
                  value={formData.branchId || ''}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                >
                  <option value="" disabled>Choose a branch...</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                  <option value="virtual">Virtual (Zoom/Meet)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-cormorant text-3xl text-ivory mb-8 text-center">Inspiration & Details</h2>
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
              <div>
                <label className="block font-montserrat text-xs text-gold uppercase tracking-widest mb-3">Estimated Budget (INR)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#111] border border-white/20 p-4 text-ivory font-poppins focus:border-gold focus:outline-none"
                  placeholder="e.g. 150000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-montserrat text-xs text-gold uppercase tracking-widest mb-3">Moodboard / Inspiration</label>
                <InspirationUpload images={formData.inspiration} setImages={(imgs) => setFormData({ ...formData, inspiration: imgs })} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-cormorant text-3xl text-ivory mb-8 text-center">Review Booking</h2>
            <div className="max-w-xl mx-auto bg-[#111] border border-gold/30 p-8">
              <div className="space-y-4 font-poppins text-sm text-ivory">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-grey">Type</span>
                  <span>{formData.type}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-grey">Stylist</span>
                  <span>{experts.find(e => e.id === formData.expertId)?.user?.name || 'Any Available'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-grey">Date & Time</span>
                  <span>{formData.date?.toLocaleDateString()} at {formData.time}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-grey">Location</span>
                  <span>{formData.branchId === 'virtual' ? 'Virtual' : branches.find(b => b.id === formData.branchId)?.name}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gold/30 mt-8">
                  <span className="font-montserrat uppercase tracking-widest text-gold text-xs">Booking Fee</span>
                  <span className="text-lg">₹5,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <Button variant="ghost" onClick={handlePrev}>Back</Button>
        ) : <div />}
        
        {step < 5 ? (
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.type) ||
              (step === 2 && !formData.expertId) ||
              (step === 3 && (!formData.date || !formData.time || !formData.branchId))
            }
          >
            Continue
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} isLoading={loading}>
            Pay & Confirm
          </Button>
        )}
      </div>

      <Modal isOpen={showSuccess} onClose={() => { setShowSuccess(false); window.location.href='/dashboard/customer'; }} title="Booking Confirmed">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
            ✓
          </div>
          <h3 className="font-cormorant text-3xl text-ivory mb-4">You're all set!</h3>
          <p className="font-poppins text-grey mb-8">
            Your consultation has been booked. A confirmation email has been sent to you along with the payment receipt.
          </p>
          <Button variant="primary" className="w-full" onClick={() => window.location.href='/dashboard/customer'}>
            Go to Dashboard
          </Button>
        </div>
      </Modal>
    </div>
  );
}
