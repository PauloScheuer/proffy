import React, { TextareaHTMLAttributes } from 'react';
import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

export default function TextArea({ label, name, ...rest }: TextAreaProps) {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest}></textarea>
    </div>
  );
}
