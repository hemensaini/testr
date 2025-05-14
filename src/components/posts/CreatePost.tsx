import React, { useState, useRef } from 'react';
import { Image, BarChart3, Send, X, Loader2 } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [embeddedCharts, setEmbeddedCharts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotifications();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real app, you would upload these to a storage service
    // For now, we'll just create object URLs
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...urls]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && photos.length === 0 && embeddedCharts.length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          content,
          photos,
          embedded_charts: embeddedCharts,
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      setContent('');
      setPhotos([]);
      setEmbeddedCharts([]);
      addNotification({
        type: 'success',
        message: 'Post created successfully!',
        userId: 'current-user',
        isRead: false,
      });
      onPostCreated?.();

    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to create post. Please try again.',
        userId: 'current-user',
        isRead: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          rows={3}
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Photo Preview */}
        {photos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {photos.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  onClick={() => removePhoto(index)}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <BarChart3 size={20} />
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (!content.trim() && photos.length === 0 && embeddedCharts.length === 0)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;