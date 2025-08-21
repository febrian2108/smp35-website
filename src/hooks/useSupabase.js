import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabase = (tableName) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel(`public:${tableName}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: tableName 
        }, 
        (payload) => {
          console.log('Change received!', payload);
          fetchDocuments(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tableName]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDocuments(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError(error.message);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (data) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([data])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Error adding document:', error);
      return { success: false, error: error.message };
    }
  };

  const updateDocument = async (id, data) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteDocument = async (id) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error);
      return { success: false, error: error.message };
    }
  };

  const getDocument = async (id) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error getting document:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    refetch: fetchDocuments
  };
};

