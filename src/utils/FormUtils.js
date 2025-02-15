export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
        console.log('Starting upload to Cloudinary...');
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary Error:', errorData);
            throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Upload response:', data);

        if (data.secure_url) {
            return data.secure_url;
        } else if (data.url) {
            return data.url;
        } else {
            throw new Error('No URL received from Cloudinary');
        }
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
export const saveFormData = (data) => {
    localStorage.setItem('conferenceFormData', JSON.stringify(data));
};

export const getFormData = () => {
    const data = localStorage.getItem('conferenceFormData');
    return data ? JSON.parse(data) : null;
};

export const getTicketSelection = () => {
    const data = localStorage.getItem('ticketSelection');
    return data ? JSON.parse(data) : null;
};

export const saveTicketSelection = (selection) => {
    localStorage.setItem('ticketSelection', JSON.stringify(selection));
};