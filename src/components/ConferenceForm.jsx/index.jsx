import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Heading from '../reuseables/Heading';
import ButtonGroup from '../reuseables/ButtonGroup';
import { uploadToCloudinary, saveFormData, getFormData } from '../../utils/FormUtils'
import './ConferenceForm.css';

const ConferenceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        request: '',
        imageUrl: ''
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    // Load saved data on component mount
    useEffect(() => {
        const savedData = getFormData();
        if (savedData) {
            setFormData(savedData);
            if (savedData.imageUrl) {
                setPreviewUrl(savedData.imageUrl);
            }
        }
    }, []);

    // Handle drag and drop
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    // Handle file drop
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

    // Handle file input change
    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await handleFileUpload(file);
        }
    };

    // Handle file upload
    const handleFileUpload = async (file) => {
        setIsLoading(true);
        try {
            // Create preview URL
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);

            // Upload to Cloudinary
            const cloudinaryUrl = await uploadToCloudinary(file);
            
            // Update form data
            const newFormData = {
                ...formData,
                imageUrl: cloudinaryUrl
            };
            setFormData(newFormData);
            saveFormData(newFormData);
            
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload image');
            setPreviewUrl('');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };
        setFormData(newFormData);
        saveFormData(newFormData);
    };

    // Handle navigation
    const handleBack = () => {
        navigate(-1);
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!formData.imageUrl) {
            toast.error('Please upload a profile photo');
            return;
        }

        // Navigate to next step with form data
        navigate('/confirmation', { state: { formData } });
    };

    return (
        <div className='container'>
            <Heading title="Attendee Details" subtitle="Step 2/3" icon="/icons/step2.svg" />
            <form className='form-container' onSubmit={handleNext}>
                <div className='upload-container'>
                    <p>Upload Profile Photo</p>
                    <div 
                        className={`upload-box-container ${isDragging ? 'dragging' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {previewUrl ? (
                            <div className='preview-container'>
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="preview-image"
                                />
                                {isLoading && <div className="loading-overlay">Uploading...</div>}
                            </div>
                        ) : (
                            <div className='draganddrop'>
                                <img 
                                    src="/icons/upload.svg" 
                                    alt="cloud icon for document drag and drop and upload" 
                                />
                                <p>Drag & drop or click to upload</p>
                                {isLoading && <p>Uploading...</p>}
                            </div>
                        )}
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileInput}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <img src="/icons/breakline.svg" alt="breakline icon" className='breakline'/>

                <div className='name-input'>
                    <label htmlFor="name">Enter your name</label>
                    <input 
                        type="text" 
                        id='name' 
                        className='input-forms'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='email-input'>
                    <label htmlFor="email">Enter your email</label>
                    <input 
                        type="email" 
                        id='email' 
                        className='input-forms'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='✉️ example@email.com'
                        required
                    />
                </div>

                <div className='textarea'>
                    <label htmlFor="request">Special request ?</label>
                    <textarea 
                        id='request' 
                        className='input-forms'
                        value={formData.request}
                        onChange={handleInputChange}
                        placeholder='Enter any special requests here'
                    />
                </div>

                <div className='btn-form'>
                    <ButtonGroup 
                        btnOneText="Back" 
                        btnTwoText="Get My Free Ticket" 
                        onCancel={handleBack} 
                        onNext={handleNext}
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default ConferenceForm;