import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file, bucket = 'images', path = null) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Generate unique filename if path not provided
      const fileExt = file.name.split('.').pop();
      const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      
      return {
        success: true,
        data: {
          path: data.path,
          fullPath: data.fullPath,
          publicUrl: publicUrl
        }
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (filePath, bucket = 'images') => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }
  };

  const getPublicUrl = (filePath, bucket = 'images') => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  const listFiles = async (folder = '', bucket = 'images') => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: 100,
          offset: 0
        });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('List files error:', error);
      return { success: false, error: error.message };
    }
  };

  const downloadFile = async (filePath, bucket = 'images') => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(filePath);

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Download error:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    uploading,
    uploadProgress,
    uploadFile,
    deleteFile,
    getPublicUrl,
    listFiles,
    downloadFile
  };
};

