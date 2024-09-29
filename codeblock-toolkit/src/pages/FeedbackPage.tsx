import { useState } from 'react';

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true); // Set loading to true during submission

    const formData = {
      name,
      email,
      feedback,
      suggestions,
    };

    // Send form data to the Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbyKZBDThfrbWVWIhLsJfy34HZ6BixBKCndr4OGG_0BO5RxOyRkRgegl-IcJsotdpPZ7/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false); // Stop loading once response is received

        // Assuming the server returns a success flag
        if (data.status === 'success') {
          console.log('Feedback submitted successfully');
          setSubmitted(true);
          // Clear form inputs only after success
          setName('');
          setEmail('');
          setFeedback('');
          setSuggestions('');
        } else {
          console.log('Failed to submit feedback');
        }
      })
      .catch(error => {
        setLoading(false); // Stop loading on error
        console.error('Error:', error);
      });
  };

  return (
    <div className="feedback-form p-6 bg-gray-100 rounded-lg border border-gray-300 max-w-md mx-auto relative">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        &#10005;
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
            disabled={loading} // Disable input during submission
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
            disabled={loading} // Disable input during submission
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
            disabled={loading} // Disable input during submission
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Suggestions (Optional)</label>
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during submission
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading} // Disable submit button during submission
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
