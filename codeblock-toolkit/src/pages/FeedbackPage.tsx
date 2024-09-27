import { useState } from 'react';

interface FeedbackFormProps {
  onClose: () => void; // Define the type for onClose prop
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  // States to store form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false); // To track submission status

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to send feedback (could be an API call or storing in a database)
    console.log('Feedback submitted:', { name, email, feedback, suggestions });

    // Reset form and show confirmation
    setName('');
    setEmail('');
    setFeedback('');
    setSuggestions('');
    setSubmitted(true); // Show a success message
  };

  return (
    <div className="feedback-form p-6 bg-gray-100 rounded-lg border border-gray-300 max-w-md mx-auto relative">
      {/* X button to close the form */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        &#10005; {/* HTML entity for 'X' */}
      </button>

      <h2 className="text-lg font-bold mb-4">We Value Your Feedback</h2>
      
      {submitted && (
        <div className="text-green-600 font-semibold mb-4">
          Thank you for your feedback!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Suggestions (Optional)</label>
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
