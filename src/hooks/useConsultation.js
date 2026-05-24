'use client';
import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

export const useConsultation = () => {
  const [loading, setLoading] = useState(false);
  const [experts, setExperts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);

  const loadExperts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getExperts();
      if (res.success) setExperts(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBranches = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getBranches();
      if (res.success) setBranches(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const bookConsultation = async (data) => {
    try {
      setLoading(true);
      const res = await api.bookConsultation(data);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    experts,
    branches,
    loading,
    error,
    loadExperts,
    loadBranches,
    bookConsultation
  };
};
