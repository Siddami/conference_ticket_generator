import React from "react";
import useConferenceForm from "../../hooks/UseConferenceForm";
import Heading from "../reuseables/Heading";
import ButtonGroup from "../reuseables/ButtonGroup";
import "./ConferenceForm.css";

const ConferenceForm = () => {
    const {
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
    } = useConferenceForm();

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div className="container">
            <Heading title="Attendee Details" subtitle="Step 2/3" icon="/icons/step2.svg" />
            <form className="form-container" onSubmit={handleNext}>
                <div className="upload-container">
                    <label htmlFor="fileInput">
                        Upload Profile Photo {isImageUploaded ? "(✓)" : ""}
                    </label>
                    <div 
                        className={`upload-box-container ${isDragging ? "dragging" : ""}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        role="button"
                        tabIndex="0"
                        aria-label="Upload a profile picture by dragging or clicking"
                        onKeyDown={(e) => e.key === "Enter" && document.getElementById("fileInput").click()}
                    >
                        {previewUrl ? (
                            <div className="preview-container" onClick={triggerFileInput}>
                                <img 
                                    src={previewUrl} 
                                    alt="Uploaded profile preview" 
                                    className="preview-image"
                                />
                                {isLoading && <div className="loading-overlay" aria-live="polite">Uploading...</div>}
                            </div>
                        ) : (
                            <div className="draganddrop" onClick={triggerFileInput}>
                                <img src="/icons/upload.svg" alt="" aria-hidden="true" />
                                <p>Drag & drop or click to upload</p>
                                {isLoading && <p aria-live="polite">Uploading...</p>}
                            </div>
                        )}
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileInput}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <img src="/icons/breakline.svg" alt="" className="breakline" aria-hidden="true" />

                <div className="name-input">
                    <label htmlFor="name">Enter your name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="input-forms"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="email-input">
                    <label htmlFor="email">Enter your email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="input-forms"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="✉️ example@email.com"
                        required
                    />
                </div>

                <div className="textarea">
                    <label htmlFor="request">Special request?</label>
                    <textarea 
                        id="request" 
                        className="input-forms"
                        value={formData.request}
                        onChange={handleInputChange}
                        placeholder="Enter any special requests here"
                    />
                </div>

                <div className="btn-form">
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