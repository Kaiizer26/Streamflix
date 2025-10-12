import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }

    // Validation du sujet
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    // Validation de la checkbox
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulation d'un envoi (remplace par un vrai appel API)
    setTimeout(() => {
      console.log('Données du formulaire:', formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        acceptTerms: false
      });

      // Masquer le message de succès après 5 secondes
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">📬</span>
            Contactez-nous
          </h1>
          <p className="text-gray-400 text-lg">
            Une question ? Une suggestion ? N'hésitez pas à nous contacter !
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <strong className="text-green-400 font-semibold">Message envoyé !</strong>
              <p className="text-green-300 text-sm mt-1">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
            <button
              type="button"
              className="text-green-400 hover:text-green-300 transition-colors"
              onClick={() => setSubmitSuccess(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 mb-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 bg-gray-900/50 border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent transition-all duration-200`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 bg-gray-900/50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent transition-all duration-200`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Sujet */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Sujet <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-4 py-3 bg-gray-900/50 border ${
                  errors.subject ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.subject ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent transition-all duration-200 cursor-pointer`}
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="" className="bg-gray-900">Choisissez un sujet</option>
                <option value="question" className="bg-gray-900">Question générale</option>
                <option value="bug" className="bg-gray-900">Signaler un bug</option>
                <option value="feature" className="bg-gray-900">Demande de fonctionnalité</option>
                <option value="other" className="bg-gray-900">Autre</option>
              </select>
              {errors.subject && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full px-4 py-3 bg-gray-900/50 border ${
                  errors.message ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.message ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent transition-all duration-200 resize-none`}
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                maxLength="500"
              ></textarea>
              <div className="flex items-center justify-between mt-2">
                {errors.message ? (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </p>
                ) : (
                  <span></span>
                )}
                <span className={`text-sm ${
                  formData.message.length >= 500 ? 'text-yellow-400' : 'text-gray-500'
                }`}>
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* Checkbox */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className={`mt-1 w-5 h-5 rounded border ${
                    errors.acceptTerms ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-900/50 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer`}
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <label className="text-sm text-gray-300 cursor-pointer select-none" htmlFor="acceptTerms">
                  J'accepte les conditions d'utilisation
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1 ml-8">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <span>📨</span>
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6 text-center hover:transform hover:scale-105 transition-all duration-200">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Adresse</h3>
            <p className="text-gray-400">
              123 Rue du Web<br />
              75001 Paris
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6 text-center hover:transform hover:scale-105 transition-all duration-200">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <a href="mailto:contact@streamtech.fr" className="text-blue-400 hover:text-blue-300 transition-colors">
              contact@streamtech.fr
            </a>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6 text-center hover:transform hover:scale-105 transition-all duration-200">
            <div className="text-4xl mb-3">📞</div>
            <h3 className="text-xl font-semibold text-white mb-2">Téléphone</h3>
            <a href="tel:+33123456789" className="text-blue-400 hover:text-blue-300 transition-colors">
              01 23 45 67 89
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
