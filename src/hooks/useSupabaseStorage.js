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

      // Determine bucket based on file type or explicit bucket parameter
      let finalBucket = bucket;
      if (file.type.includes('pdf') || file.type.includes('document') || 
          file.name.toLowerCase().endsWith('.pdf') || 
          file.name.toLowerCase().endsWith('.doc') || 
          file.name.toLowerCase().endsWith('.docx')) {
        finalBucket = 'documents';
      }

      console.log('Uploading file:', {
        name: file.name,
        type: file.type,
        size: file.size,
        bucket: finalBucket,
        path: filePath
      });

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(finalBucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Allow overwrite if file exists
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(finalBucket)
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      setUploadProgress(100);
      
      return {
        success: true,
        data: {
          path: data.path,
          fullPath: data.fullPath,
          publicUrl: publicUrl,
          bucket: finalBucket,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size
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

  const uploadImage = async (file, folder = 'news') => {
    return await uploadFile(file, 'images', `${folder}/${Date.now()}-${file.name}`);
  };

  const uploadDocument = async (file, folder = 'news') => {
    return await uploadFile(file, 'documents', `${folder}/${Date.now()}-${file.name}`);
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
    uploadImage,
    uploadDocument,
    deleteFile,
    getPublicUrl,
    listFiles,
    downloadFile
  };
};

