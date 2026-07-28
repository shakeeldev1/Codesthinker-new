import { API_BASE_URL } from '../config';

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const handleDownloadResume = async (type: string, id: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/resumes/${type}/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to download resume');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error downloading resume:', err);
    alert('Failed to download resume. Please try again.');
  }
};
