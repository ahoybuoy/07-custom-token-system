import React, { useRef, useState } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onError?: (error: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize,
  maxFiles = 10,
  disabled = false,
  onFilesSelected,
  onError,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files).slice(0, multiple ? maxFiles : 1);

    if (maxSize) {
      const oversizedFile = fileArray.find(f => f.size > maxSize);
      if (oversizedFile) {
        onError?.(`File "${oversizedFile.name}" exceeds maximum size`);
        return;
      }
    }

    onFilesSelected?.(fileArray);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['3'],
    padding: spacing['8'],
    border: `2px dashed ${isDragging ? colors.primary[500] : colors.neutral[300]}`,
    borderRadius: borderRadius.lg,
    backgroundColor: isDragging ? colors.primary[50] : colors.neutral[50],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const iconStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    color: isDragging ? colors.primary[500] : colors.neutral[400],
  };

  const textStyle: React.CSSProperties = {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.neutral[700],
    textAlign: 'center',
  };

  const subTextStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
  };

  const buttonStyle: React.CSSProperties = {
    padding: `${spacing['2']} ${spacing['4']}`,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.primary[600],
    backgroundColor: 'transparent',
    border: `1px solid ${colors.primary[500]}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
  };

  return (
    <div
      style={containerStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <UploadIcon style={iconStyle} />
      <div style={textStyle}>
        Drag and drop files here, or
      </div>
      <button type="button" style={buttonStyle} disabled={disabled}>
        Browse files
      </button>
      <div style={subTextStyle}>
        {accept ? `Accepted: ${accept}` : 'All file types accepted'}
        {maxSize && ` • Max size: ${(maxSize / 1024 / 1024).toFixed(1)}MB`}
      </div>
    </div>
  );
};

const UploadIcon: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <svg style={style} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 32V16M24 16L18 22M24 16L30 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 32V36C8 38.2091 9.79086 40 12 40H36C38.2091 40 40 38.2091 40 36V32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default FileUpload;
