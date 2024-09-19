import React, { useState, useRef } from 'react';

const CopyWithIndentationFromDiv: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle copying the text with preserved indentation
  const handleCopy = () => {
    const textContainer = textContainerRef.current;
    if (textContainer) {
      const textToCopy = Array.from(textContainer.childNodes)
        .map((node: ChildNode) => (node as HTMLElement).innerText) // Get the text content of each <p> or <div>
        .join('\n'); // Join with new lines to preserve structure

      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopySuccess('Text copied!');
      }).catch(() => {
        setCopySuccess('Failed to copy.');
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Copy Text from Divs and Paragraphs with Indentation</h2>

      {/* Container with the text (using divs and p tags) */}
      <div ref={textContainerRef} className="border p-2 bg-gray-100">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;This is indented text.</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;It maintains indentation when copied.</p>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This line has deeper indentation.</div>
      </div>
      
      <button onClick={handleCopy} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Copy Text
      </button>
      
      {/* Display a success/failure message */}
      {copySuccess && <p className="mt-2">{copySuccess}</p>}
    </div>
  );
};

export default CopyWithIndentationFromDiv;
