import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

// DONNÉES DU QUIZ PAR CATÉGORIE 
const quizCategories = {
  classiques: {
    name: "🎭 Classiques",
    description: "Les films intemporels du cinéma",
    color: "from-amber-500 to-yellow-600",
    questions: [
      {
        id: 1,
        question: "Qui a réalisé le film 'Casablanca' (1942) ?",
        options: ["Alfred Hitchcock", "Michael Curtiz", "Billy Wilder", "Frank Capra"],
        correctAnswer: "Michael Curtiz"
      },
      {
        id: 2,
        question: "Dans 'Autant en emporte le vent', quel est le nom du domaine de Scarlett ?",
        options: ["Tara", "Twelve Oaks", "Atlanta", "Jonesboro"],
        correctAnswer: "Tara"
      },
      {
        id: 3,
        question: "Combien d'Oscars a remporté le film 'Titanic' (1997) ?",
        options: ["8", "11", "14", "9"],
        correctAnswer: "11"
      },
      {
        id: 4,
        question: "Quel réalisateur est connu pour ses films 'Pulp Fiction' et 'Kill Bill' ?",
        options: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Guy Ritchie"],
        correctAnswer: "Quentin Tarantino"
      },
      {
        id: 5,
        question: "Dans 'Le Parrain', qui joue le rôle de Don Vito Corleone ?",
        options: ["Al Pacino", "Marlon Brando", "Robert De Niro", "James Caan"],
        correctAnswer: "Marlon Brando"
      },
      {
        id: 6,
        question: "Quel film a remporté l'Oscar du meilleur film en 2020 ?",
        options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
        correctAnswer: "Parasite"
      },
      {
        id: 7,
        question: "Qui a réalisé 'La Liste de Schindler' ?",
        options: ["Steven Spielberg", "Martin Scorsese", "Francis Ford Coppola", "Ridley Scott"],
        correctAnswer: "Steven Spielberg"
      },
      {
        id: 8,
        question: "Dans 'Le Seigneur des Anneaux', qui doit détruire l'anneau unique ?",
        options: ["Aragorn", "Gandalf", "Frodon", "Sam"],
        correctAnswer: "Frodon"
      },
      {
        id: 9,
        question: "Quel acteur joue le rôle de Jack Sparrow dans 'Pirates des Caraïbes' ?",
        options: ["Orlando Bloom", "Johnny Depp", "Geoffrey Rush", "Javier Bardem"],
        correctAnswer: "Johnny Depp"
      },
      {
        id: 10,
        question: "Qui a composé la musique de 'Star Wars' ?",
        options: ["Hans Zimmer", "John Williams", "Ennio Morricone", "Danny Elfman"],
        correctAnswer: "John Williams"
      }
    ]
  },
  action: {
    name: "💥 Action",
    description: "Explosions, cascades et adrénaline",
    color: "from-red-500 to-orange-600",
    questions: [
      {
        id: 1,
        question: "Qui incarne Iron Man dans l'univers cinématographique Marvel ?",
        options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
        correctAnswer: "Robert Downey Jr."
      },
      {
        id: 2,
        question: "Dans 'Matrix', quelle pilule Neo choisit-il ?",
        options: ["La pilule bleue", "La pilule rouge", "La pilule verte", "La pilule jaune"],
        correctAnswer: "La pilule rouge"
      },
      {
        id: 3,
        question: "Quel acteur joue John Wick ?",
        options: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Jason Statham"],
        correctAnswer: "Keanu Reeves"
      },
      {
        id: 4,
        question: "Dans 'Die Hard', où se déroule l'action principale ?",
        options: ["Un aéroport", "Un gratte-ciel", "Un stade", "Un métro"],
        correctAnswer: "Un gratte-ciel"
      },
      {
        id: 5,
        question: "Qui réalise 'Mad Max: Fury Road' ?",
        options: ["James Cameron", "George Miller", "Ridley Scott", "Michael Bay"],
        correctAnswer: "George Miller"
      },
      {
        id: 6,
        question: "Dans 'Terminator', quelle est la phrase culte ?",
        options: ["I'll be back", "Hasta la vista", "Come with me", "Get out"],
        correctAnswer: "I'll be back"
      },
      {
        id: 7,
        question: "Qui joue Ethan Hunt dans 'Mission Impossible' ?",
        options: ["Brad Pitt", "Tom Cruise", "Matt Damon", "George Clooney"],
        correctAnswer: "Tom Cruise"
      },
      {
        id: 8,
        question: "Dans quel film Bruce Willis joue-t-il un policier piégé dans un gratte-ciel ?",
        options: ["Die Hard", "The Fifth Element", "Looper", "Red"],
        correctAnswer: "Die Hard"
      },
      {
        id: 9,
        question: "Qui est le réalisateur de 'Gladiator' ?",
        options: ["Ridley Scott", "Peter Jackson", "Christopher Nolan", "James Cameron"],
        correctAnswer: "Ridley Scott"
      },
      {
        id: 10,
        question: "Dans 'Fast & Furious', quel est le prénom du personnage joué par Vin Diesel ?",
        options: ["Brian", "Roman", "Dominic", "Luke"],
        correctAnswer: "Dominic"
      }
    ]
  },
  scifi: {
    name: "🚀 Science-Fiction",
    description: "Voyage dans le futur et l'espace",
    color: "from-blue-500 to-purple-600",
    questions: [
      {
        id: 1,
        question: "Qui a réalisé le film 'Inception' (2010) ?",
        options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"],
        correctAnswer: "Christopher Nolan"
      },
      {
        id: 2,
        question: "Dans quel film trouve-t-on la réplique culte 'May the Force be with you' ?",
        options: ["Star Trek", "Star Wars", "Interstellar", "Avatar"],
        correctAnswer: "Star Wars"
      },
      {
        id: 3,
        question: "Quel film de science-fiction se déroule en grande partie dans une ville appelée Gotham ?",
        options: ["Spider-Man", "Superman", "Batman", "Iron Man"],
        correctAnswer: "Batman"
      },
      {
        id: 4,
        question: "Dans 'Blade Runner', qui joue le rôle de Rick Deckard ?",
        options: ["Harrison Ford", "Kurt Russell", "Sylvester Stallone", "Arnold Schwarzenegger"],
        correctAnswer: "Harrison Ford"
      },
      {
        id: 5,
        question: "Quel est le nom du vaisseau spatial dans 'Alien' ?",
        options: ["Discovery", "Nostromo", "Enterprise", "Millennium Falcon"],
        correctAnswer: "Nostromo"
      },
      {
        id: 6,
        question: "Dans 'Interstellar', qui joue le rôle principal de Cooper ?",
        options: ["Leonardo DiCaprio", "Matthew McConaughey", "Brad Pitt", "Tom Hanks"],
        correctAnswer: "Matthew McConaughey"
      },
      {
        id: 7,
        question: "Qui réalise 'E.T. l'extra-terrestre' ?",
        options: ["George Lucas", "Steven Spielberg", "James Cameron", "Robert Zemeckis"],
        correctAnswer: "Steven Spielberg"
      },
      {
        id: 8,
        question: "Dans 'Avatar', quelle est la planète des Na'vi ?",
        options: ["Mars", "Pandora", "Titan", "Europa"],
        correctAnswer: "Pandora"
      },
      {
        id: 9,
        question: "Qui joue Neo dans 'Matrix' ?",
        options: ["Brad Pitt", "Keanu Reeves", "Tom Cruise", "Will Smith"],
        correctAnswer: "Keanu Reeves"
      },
      {
        id: 10,
        question: "Dans '2001: L'Odyssée de l'espace', comment s'appelle l'ordinateur ?",
        options: ["HAL 9000", "WALL-E", "R2-D2", "DATA"],
        correctAnswer: "HAL 9000"
      }
    ]
  },
  animation: {
    name: "🎨 Animation",
    description: "L'univers magique des films d'animation",
    color: "from-pink-500 to-rose-600",
    questions: [
      {
        id: 1,
        question: "Quel est le film d'animation le plus rentable de tous les temps ?",
        options: ["Le Roi Lion (2019)", "La Reine des Neiges 2", "Toy Story 4", "Les Indestructibles 2"],
        correctAnswer: "Le Roi Lion (2019)"
      },
      {
        id: 2,
        question: "Quel studio a créé 'Toy Story' ?",
        options: ["DreamWorks", "Pixar", "Blue Sky", "Illumination"],
        correctAnswer: "Pixar"
      },
      {
        id: 3,
        question: "Dans 'Le Roi Lion', comment s'appelle le fils de Mufasa ?",
        options: ["Timon", "Pumba", "Simba", "Scar"],
        correctAnswer: "Simba"
      },
      {
        id: 4,
        question: "Qui réalise 'Le Voyage de Chihiro' ?",
        options: ["Makoto Shinkai", "Hayao Miyazaki", "Satoshi Kon", "Mamoru Hosoda"],
        correctAnswer: "Hayao Miyazaki"
      },
      {
        id: 5,
        question: "Dans 'La Reine des Neiges', quelle chanson est devenue un tube mondial ?",
        options: ["Let It Go", "Do You Want to Build a Snowman", "For the First Time", "Love Is an Open Door"],
        correctAnswer: "Let It Go"
      },
      {
        id: 6,
        question: "Quel est le nom du rat cuisinier dans 'Ratatouille' ?",
        options: ["Remy", "Linguini", "Emile", "Django"],
        correctAnswer: "Remy"
      },
      {
        id: 7,
        question: "Dans 'Shrek', qui double l'âne en version originale ?",
        options: ["Jim Carrey", "Eddie Murphy", "Chris Rock", "Will Smith"],
        correctAnswer: "Eddie Murphy"
      },
      {
        id: 8,
        question: "Quel studio a créé 'Kung Fu Panda' ?",
        options: ["Pixar", "DreamWorks", "Disney", "Blue Sky"],
        correctAnswer: "DreamWorks"
      },
      {
        id: 9,
        question: "Dans 'Vice-Versa', quelle émotion est représentée en bleu ?",
        options: ["Joie", "Tristesse", "Colère", "Peur"],
        correctAnswer: "Tristesse"
      },
      {
        id: 10,
        question: "Quel est le premier long-métrage d'animation de Disney ?",
        options: ["Cendrillon", "Blanche-Neige", "Pinocchio", "Fantasia"],
        correctAnswer: "Blanche-Neige"
      }
    ]
  }
};

// Écran d'accueil

function QuizWelcome({ onStartQuiz, bestScores, challengeMode, onToggleChallengeMode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Quiz Cinéma
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
              Testez vos connaissances !
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Choisissez votre catégorie et relevez le défi ! 
              10 questions avec timer de 15 secondes par question.
            </p>

            {/* Mode défi toggle */}
            <div className="mb-8 flex justify-center items-center gap-4">
              <span className={`text-lg font-semibold ${challengeMode ? 'text-gray-400' : 'text-white'}`}>
                Normal
              </span>
              <button
                onClick={onToggleChallengeMode}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                  challengeMode ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  challengeMode ? 'left-9' : 'left-1'
                }`}></div>
              </button>
              <span className={`text-lg font-semibold ${challengeMode ? 'text-orange-400' : 'text-gray-400'}`}>
                🔥 Mode Défi
              </span>
            </div>

            {challengeMode && (
              <div className="mb-6 p-4 bg-orange-600/20 border border-orange-500/50 rounded-lg inline-block animate-pulse">
                <span className="text-orange-400 font-semibold">⚡ Questions aléatoires activées !</span>
              </div>
            )}
          </div>

          {/* Sélection de catégorie */}
          <h3 className="text-2xl font-bold text-center mb-6">Choisissez votre catégorie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Object.entries(quizCategories).map(([key, category]) => (
              <div
                key={key}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-500 transition-all cursor-pointer transform hover:scale-105"
                onClick={() => onStartQuiz(key)}
              >
                <div className={`text-3xl font-bold mb-3 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </div>
                <p className="text-gray-400 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">10 questions • 15s/question</span>
                  {bestScores[key] > 0 && (
                    <span className="text-yellow-400 font-semibold">
                      🏆 {bestScores[key]}/10
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Informations sur le format */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-red-400 text-center">📋 Règles du jeu</h3>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>10 questions par catégorie</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>⏱️ 15 secondes pour répondre à chaque question</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>🔥 Mode défi : ordre aléatoire des questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>🎉 Score parfait = confettis animés !</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Pas de retour en arrière possible</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interface de question avec timer 

function QuizQuestion({ 
  question, 
  currentQuestionIndex, 
  totalQuestions, 
  selectedAnswer, 
  onSelectAnswer, 
  onNextQuestion,
  timeLeft,
  categoryColor
}) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const timerProgress = (timeLeft / 15) * 100;
  const isTimeRunningOut = timeLeft <= 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* En-tête avec progression */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-400">
                Question {currentQuestionIndex + 1}/{totalQuestions}
              </span>
              <span className="text-lg font-semibold text-red-400">
                {Math.round(progress)}%
              </span>
            </div>
            
            {/* Barre de progression visuelle */}
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${categoryColor} h-full transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Timer */}
          <div className="mb-6 relative">
            <div className="flex items-center justify-center gap-4">
              <div className={`text-4xl font-bold ${isTimeRunningOut ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                ⏱️ {timeLeft}s
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${
                  isTimeRunningOut ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${timerProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Question avec animation */}
          <div 
            key={currentQuestionIndex}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 mb-8 border border-gray-700 animate-slideIn"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {question.question}
            </h2>

            {/* Options de réponse */}
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectAnswer(option)}
                  disabled={timeLeft === 0}
                  className={`p-4 rounded-lg text-left transition-all transform hover:scale-102 border-2 animate-fadeIn ${
                    selectedAnswer === option
                      ? 'bg-red-600 border-red-400 shadow-lg shadow-red-600/50'
                      : 'bg-gray-700/50 border-gray-600 hover:border-gray-500 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === option
                        ? 'border-white bg-white'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswer === option && (
                        <div className="w-4 h-4 rounded-full bg-red-600"></div>
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bouton suivant */}
          <div className="flex justify-end">
            <button
              onClick={onNextQuestion}
              disabled={!selectedAnswer && timeLeft > 0}
              className={`font-bold py-3 px-8 rounded-lg transition-all transform ${
                selectedAnswer || timeLeft === 0
                  ? 'bg-red-600 hover:bg-red-700 hover:scale-105 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLastQuestion ? '🎯 Voir mes résultats' : '➡️ Question suivante'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//  Détail d'une réponse 

function AnswerDetail({ question, index, userAnswer, isCorrect }) {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border-2 ${
        isCorrect ? 'border-green-500' : 'border-red-500'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icône de résultat */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isCorrect ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isCorrect ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        {/* Contenu de la réponse */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">
            Question {index + 1} : {question.question}
          </h3>
          
          <div className="space-y-2">
            <div className={`p-3 rounded ${
              isCorrect ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'
            }`}>
              <span className="font-semibold">Votre réponse : </span>
              <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                {userAnswer}
              </span>
            </div>

            {!isCorrect && (
              <div className="p-3 rounded bg-green-900/30 border border-green-500">
                <span className="font-semibold">Bonne réponse : </span>
                <span className="text-green-400">{question.correctAnswer}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Écran des résultats 

function QuizResults({ 
  score, 
  totalQuestions, 
  questions, 
  userAnswers, 
  onRestart, 
  onGoHome,
  onShareScore,
  isNewBestScore,
  categoryName,
  categoryColor
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfectScore = score === totalQuestions;
  const [showConfetti, setShowConfetti] = useState(isPerfectScore);

  useEffect(() => {
    if (isPerfectScore) {
      // Arrêter les confettis après 5 secondes
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isPerfectScore]);
  
  // Message personnalisé selon le score
  const getScoreMessage = () => {
    if (score <= 3) {
      return "Vous devriez regarder plus de films ! 🎬";
    } else if (score <= 6) {
      return "Pas mal ! Un vrai amateur de cinéma 🍿";
    } else if (score <= 8) {
      return "Excellent ! Vous êtes un cinéphile confirmé 🌟";
    } else if (score === 9) {
      return "Presque parfait ! Vous êtes un expert ! ⭐";
    } else {
      return "SCORE PARFAIT ! Vous êtes une légende ! 🏆✨";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Confettis pour score parfait avec animation */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={true}
            numberOfPieces={300}
            gravity={0.3}
            colors={['#ff0000', '#ff6b00', '#ffd700', '#ff1493', '#9400d3', '#00ff00']}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto animate-fadeIn">
          {/* Score global */}
          <div className="text-center mb-12">
            {/* Animation spéciale pour score parfait */}
            {isPerfectScore && (
              <div className="mb-6 text-6xl animate-bounce">
                🎉🏆✨
              </div>
            )}
            
            <div className="mb-6">
              <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${categoryColor} rounded-full flex items-center justify-center mb-4 ${
                isPerfectScore ? 'animate-pulse' : ''
              } shadow-2xl`}>
                <span className="text-5xl font-bold">{score}</span>
                <span className="text-2xl">/{totalQuestions}</span>
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isPerfectScore ? 'animate-pulse' : ''
            }`}>
              {categoryName}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Score : {score}/{totalQuestions}
            </h2>
            <p className="text-2xl text-gray-300 mb-4">{getScoreMessage()}</p>
            <p className="text-xl text-gray-400">Pourcentage : {percentage}%</p>

            {/* Badge nouveau record */}
            {isNewBestScore && score > 0 && (
              <div className="mt-4 inline-block bg-yellow-600/30 border-2 border-yellow-500 rounded-lg px-6 py-3 animate-bounce">
                <span className="text-yellow-400 font-bold text-lg">🎉 Nouveau record personnel !</span>
              </div>
            )}

            {/* Badge score parfait */}
            {isPerfectScore && (
              <div className="mt-4">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xl px-8 py-4 rounded-full animate-pulse shadow-2xl">
                  ⭐ SCORE PARFAIT - 10/10 ! ⭐
                </div>
              </div>
            )}

            {/* Bouton de partage amélioré */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onShareScore}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                📋 Partager mon score
              </button>
            </div>
          </div>

          {/* Détail des réponses */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">📝 Détail des réponses</h2>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index] || "Pas de réponse (temps écoulé)";
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <AnswerDetail
                    key={question.id}
                    question={question}
                    index={index}
                    userAnswer={userAnswer}
                    isCorrect={isCorrect}
                  />
                );
              })}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onRestart}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 w-full sm:w-auto shadow-lg"
            >
              🔄 Recommencer le quiz
            </button>
            <button
              onClick={onGoHome}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 w-full sm:w-auto shadow-lg"
            >
              🏠 Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//  QUIZ 

function Quiz() {
  const navigate = useNavigate();
  
  // États du quiz
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [bestScores, setBestScores] = useState({
    classiques: 0,
    action: 0,
    scifi: 0,
    animation: 0
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [challengeMode, setChallengeMode] = useState(false);

  // ==================== GESTION DU TIMER ====================
  useEffect(() => {
    if (quizStarted && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      // Temps écoulé, passer automatiquement à la question suivante
      handleNextQuestion();
    }
  }, [quizStarted, showResults, timeLeft]);

  // ==================== GESTIONNAIRES D'ÉVÉNEMENTS ====================
  
  /**
   * Mélanger un tableau (algorithme Fisher-Yates)
   */
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Activer/désactiver le mode défi
   */
  const handleToggleChallengeMode = () => {
    setChallengeMode(!challengeMode);
  };

  /**
   * Démarrer le quiz et réinitialiser tous les états
   */
  const handleStartQuiz = (categoryKey) => {
    const category = quizCategories[categoryKey];
    setSelectedCategory(categoryKey);
    
    // En mode défi, mélanger les questions
    const questions = challengeMode 
      ? shuffleArray(category.questions) 
      : category.questions;
    
    setCurrentQuestions(questions);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setTimeLeft(15);
  };

  /**
   * Sélectionner une réponse pour la question actuelle
   */
  const handleAnswerSelect = (answer) => {
    if (timeLeft > 0) {
      setSelectedAnswer(answer);
    }
  };

  /**
   * Passer à la question suivante ou afficher les résultats
   */
  const handleNextQuestion = () => {
    // Sauvegarder la réponse de l'utilisateur (ou null si pas de réponse)
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);

    // Passer à la question suivante ou afficher les résultats
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(15); // Réinitialiser le timer
    } else {
      // Calculer le score et mettre à jour le meilleur score si nécessaire
      const finalScore = calculateScore(newAnswers);
      const currentBestScore = bestScores[selectedCategory];
      
      if (finalScore > currentBestScore) {
        setBestScores({
          ...bestScores,
          [selectedCategory]: finalScore
        });
      }
      setShowResults(true);
    }
  };

  /**
   * Calculer le score total
   */
  const calculateScore = (answers = userAnswers) => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === currentQuestions[index]?.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  /**
   * Recommencer le quiz depuis le début
   */
  const handleRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setTimeLeft(15);
  };

  /**
   * Retourner à la page d'accueil
   */
  const handleGoHome = () => {
    navigate('/');
  };

  /**
   * Partager le score (copier dans le presse-papiers)
   */
  const handleShareScore = () => {
    const score = calculateScore();
    const categoryName = quizCategories[selectedCategory].name;
    const isPerfect = score === currentQuestions.length;
    
    const shareText = isPerfect
      ? `�✨ SCORE PARFAIT ! J'ai obtenu ${score}/${currentQuestions.length} au Quiz Cinéma StreamFlix ! �\nCatégorie : ${categoryName}\n${challengeMode ? '🔥 En mode DÉFI !\n' : ''}Pouvez-vous faire mieux ?`
      : `🎬 J'ai obtenu ${score}/${currentQuestions.length} au Quiz Cinéma StreamFlix ! 🍿\nCatégorie : ${categoryName}\n${challengeMode ? '🔥 En mode DÉFI !\n' : ''}Pouvez-vous battre ce score ?`;
    
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(shareText).then(() => {
      alert('✅ Score copié dans le presse-papiers !\n\nVous pouvez maintenant le partager avec vos amis sur les réseaux sociaux ! 🚀');
    }).catch(() => {
      alert('❌ Erreur lors de la copie du score.\nVeuillez réessayer.');
    });
  };

  // RENDU CONDITIONNEL 

  // Écran d'accueil
  if (!quizStarted) {
    return (
      <QuizWelcome 
        onStartQuiz={handleStartQuiz}
        bestScores={bestScores}
        challengeMode={challengeMode}
        onToggleChallengeMode={handleToggleChallengeMode}
      />
    );
  }

  // Écran des résultats
  if (showResults) {
    const score = calculateScore();
    const currentBestScore = bestScores[selectedCategory];
    const isNewBestScore = score > currentBestScore;
    const category = quizCategories[selectedCategory];
    
    return (
      <QuizResults
        score={score}
        totalQuestions={currentQuestions.length}
        questions={currentQuestions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
        onShareScore={handleShareScore}
        isNewBestScore={isNewBestScore}
        categoryName={category.name}
        categoryColor={category.color}
      />
    );
  }

  // Écran de question
  const category = quizCategories[selectedCategory];
  return (
    <QuizQuestion
      question={currentQuestions[currentQuestion]}
      currentQuestionIndex={currentQuestion}
      totalQuestions={currentQuestions.length}
      selectedAnswer={selectedAnswer}
      onSelectAnswer={handleAnswerSelect}
      onNextQuestion={handleNextQuestion}
      timeLeft={timeLeft}
      categoryColor={category.color}
    />
  );
}

export default Quiz;
