import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadToCloudinary, saveFormData, getFormData } from "../utils/FormUtils";

const useConferenceForm = () => {
    const navigate = useNavigate();
    const initialFormState = {
        name: '',
        email: '',
        request: '',
        imageUrl: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    useEffect(() => {
        const savedData = getFormData();
        if (savedData) {
            setFormData(savedData);
            if (savedData.imageUrl) {
                setPreviewUrl(savedData.imageUrl);
                setIsImageUploaded(true);
            }
        }
    }, []);

    const resetForm = useCallback(() => {
        // Reset all form states to initial values
        setFormData(initialFormState);
        setIsDragging(false);
        setIsLoading(false);
        setPreviewUrl('');
        setIsImageUploaded(false);
        
        // Clear saved form data
        saveFormData(null);
        
        // Revoke any object URLs to prevent memory leaks
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl]);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
    }, []);

    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            await handleFileUpload(file);
        } else {
            toast.error('Please upload an image file');
        }
    }, []);

    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        setIsLoading(true);
        setIsImageUploaded(false);
        try {
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
  
            const cloudinaryUrl = await uploadToCloudinary(file);
            if (!cloudinaryUrl) throw new Error('No URL received from upload');
          
            const newFormData = { ...formData, imageUrl: cloudinaryUrl };
            setFormData(newFormData);
            saveFormData(newFormData);
            setIsImageUploaded(true);
          
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload image: ' + error.message);
            setPreviewUrl('');
            setIsImageUploaded(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };
        setFormData(newFormData);
        saveFormData(newFormData);
    };

    const handleBack = () => {
        resetForm();
        navigate(-1);
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!isImageUploaded || !formData.imageUrl) {
            toast.error('Please upload a profile photo');
            return;
        }

        navigate('/ticket', { state: { formData } });
    };

    return {
        formData,
        previewUrl,
        isDragging,
        isLoading,
        isImageUploaded,
        handleDrag,
        handleDrop,
        handleFileInput,
        handleInputChange,
        handleBack,
        handleNext,
    };
};

export default useConferenceForm;