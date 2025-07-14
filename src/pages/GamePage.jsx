import React, { useState, useEffect, useRef } from 'react';
import { ref, set, onValue, get, onDisconnect, runTransaction, push } from 'firebase/database';
import { database } from '../firebase-config';
import { motion } from 'framer-motion';

const MAX_CHANCES = 7;
const INACTIVITY_THRESHOLD = 30 * 1000; // 30 seconds

const GamePage = () => {
  const [secretWord, setSecretWord] = useState('');
  const [displayWord, setDisplayWord] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [chancesLeft, setChancesLeft] = useState(MAX_CHANCES);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isSecretSetter, setIsSecretSetter] = useState(false);
  const [players, setPlayers] = useState({});
  const [playerId, setPlayerId] = useState(localStorage.getItem('playerId') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Initialize username from localStorage
  const [showSecretWordInput, setShowSecretWordInput] = useState(false);
  const [gameReady, setGameReady] = useState(false);
  const [secretSetterId, setSecretSetterId] = useState(null);
  const [messages, setMessages] = useState([]); // New state for chat messages
  const [newMessage, setNewMessage] = useState(''); // New state for current message input
  const [totalChances, setTotalChances] = useState(0); // New state for dynamic total chances

  // Using refs to hold values that don't trigger re-renders but are needed inside listeners
  const playerIdRef = useRef(playerId);
  const usernameRef = useRef(username);
  const gameStartedRef = useRef(gameStarted);
  const secretSetterIdRef = useRef(secretSetterId);
  const playersRef = useRef(players); // Ref for players state
  const messagesEndRef = useRef(null); // New ref for scrolling chat

  useEffect(() => {
    playerIdRef.current = playerId;
    usernameRef.current = username; // Ensure usernameRef is always updated when username changes
  }, [playerId, username]);

  useEffect(() => {
    gameStartedRef.current = gameStarted;
  }, [gameStarted]);

  useEffect(() => {
    secretSetterIdRef.current = secretSetterId;
  }, [secretSetterId]);

  useEffect(() => {
    playersRef.current = players; // Keep players ref updated
  }, [players]);

  useEffect(() => {
    let currentId = playerIdRef.current;

    if (!currentId) {
      currentId = `player_${Date.now()}`;
      setPlayerId(currentId);
      localStorage.setItem('playerId', currentId);
      playerIdRef.current = currentId;
    }

    const playerRef = ref(database, `players/${currentId}`);
    const connectedRef = ref(database, '.info/connected');

    // Presence system: Set player active on connect, remove on disconnect/tab close
    const unsubscribeConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        set(playerRef, { active: true, username: usernameRef.current, lastSeen: Date.now() });
        onDisconnect(playerRef).remove(); // Remove player when disconnected
      } else if (playerIdRef.current) {
        // Handle case where client goes offline while still in game
        set(playerRef, null);
      }
    });

    // Listen for players list changes
    const playersDbRef = ref(database, 'players');
    const unsubscribePlayers = onValue(playersDbRef, (snapshot) => {
      const currentPlayers = snapshot.val() || {};
      setPlayers(currentPlayers);
      console.log(`[${username}] Players list updated:`, currentPlayers); // New log
    });

    // Listen for game state changes and handle setter assignment here
    const gameRef = ref(database, 'game');
    const unsubscribeGame = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSecretWord(data.secretWord || '');
        setDisplayWord(data.displayWord || []);
        setGuessedLetters(data.guessedLetters || []);
        setChancesLeft(data.chancesLeft || MAX_CHANCES);
        setGameStarted(data.gameStarted || false);
        setMessage(data.message || '');
        setShowSecretWordInput(false);
        setSecretSetterId(data.secretSetterId || null);
        console.log(`[${username}] Game state updated. secretSetterId:`, data.secretSetterId); // New log
        setIsSecretSetter(data.secretSetterId === playerIdRef.current);
        setTotalChances(data.totalChances || 0); // Read totalChances from DB
      } else {
        // Reset local game state if no data in DB
        setSecretWord('');
        setDisplayWord([]);
        setGuessedLetters([]);
        setChancesLeft(MAX_CHANCES);
        setGameStarted(false);
        setIsSecretSetter(false);
        setMessage('');
        setShowSecretWordInput(false);
        setSecretSetterId(null);
      }
    });

    return () => {
      // Clean up all listeners
      unsubscribeConnected();
      unsubscribeGame();
      unsubscribePlayers();
      if (playerIdRef.current) {
        set(ref(database, `players/${playerIdRef.current}`), null); // Ensure player is removed on unmount
      }
    };
  }, []); // Empty dependency array, runs once on mount

  // New useEffect for chat messages
  useEffect(() => {
    const chatRef = ref(database, 'game_chat');
    const unsubscribeChat = onValue(chatRef, (snapshot) => {
      const chatData = snapshot.val();
      if (chatData) {
        const loadedMessages = Object.keys(chatData).map(key => ({ id: key, ...chatData[key] }));
        loadedMessages.sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp
        setMessages(loadedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => {
      unsubscribeChat(); // Clean up chat listener
    };
  }, []);

  // useEffect to scroll to the bottom of chat messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // This useEffect will run when username or playerId changes to update DB and set game ready
  useEffect(() => {
    // Only update player in DB if gameReady, meaning username is confirmed
    if (playerId && username && gameReady) {
      set(ref(database, `players/${playerId}`), { active: true, username: username, lastSeen: Date.now() });
    }
  }, [username, playerId, gameReady]);

  // This useEffect handles the secretSetterId assignment logic using transactions
  // It will ONLY attempt to set the setter if game is NOT started AND no setter is currently assigned.
  useEffect(() => {
    console.log(`[${username}] Setter Assignment useEffect: Checking conditions...`);
    console.log(`[${username}] Conditions: gameStarted=${gameStarted}, playerId=${playerId}, username=${username}, playersCount=${Object.keys(players).length}, secretSetterId=${secretSetterId}`);
    // Conditions to attempt setter assignment:
    // 1. Game is not started
    // 2. Current player is ready (has playerId and username)
    // 3. There are active players
    // 4. No secretSetterId is currently assigned in local state (meaning it's not yet claimed by anyone, or was just reset to null)
    if (!gameStarted && playerId && username && Object.keys(players).length > 0) { // Removed secretSetterId === null from here
      console.log(`[${username}] All conditions met. Attempting to assign setter via transaction...`); // Debug log
      const currentTime = Date.now();
      const activePlayers = Object.keys(players).filter(id => 
        players[id].active && (currentTime - players[id].lastSeen < INACTIVITY_THRESHOLD)
      );
      console.log(`[${username}] Active Players filtered by lastSeen:`, activePlayers);
      const sortedActivePlayers = activePlayers.sort();
      console.log(`[${username}] Sorted Active Players:`, sortedActivePlayers);
      const gameRef = ref(database, 'game');

      runTransaction(gameRef, (currentData) => {
        console.log(`[${username}] Transaction: currentData before update:`, currentData); // Debug log
        console.log(`[${username}] Transaction: currentData.secretSetterId:`, currentData?.secretSetterId);
        console.log(`[${username}] Transaction: activePlayers:`, activePlayers);
        // Check if there's currently no setter or if the existing setter is inactive (based on current activePlayers list)
        if (currentData === null || !currentData.secretSetterId || !activePlayers.includes(currentData.secretSetterId)) {
          console.log(`[${username}] Transaction: Needs a new setter.`);
          if (sortedActivePlayers.length > 0) {
            const newSecretSetterCandidate = sortedActivePlayers[0];
            console.log(`[${username}] Transaction: Candidate for setter:`, newSecretSetterCandidate);
            if (newSecretSetterCandidate === playerId) { // Use direct playerId here
              console.log(`[${username}] Transaction: This client (${playerId}) is the first active player. Claiming setter role.`); // Debug log
              return { ...currentData, secretSetterId: newSecretSetterCandidate, gameStarted: false, message: '' };
            } else {
              console.log(`[${username}] Transaction: This client (${playerId}) is not the first active player. Aborting.`);
            }
          }
        } else {
          console.log(`[${username}] Transaction: Setter already exists and is active. Aborting.`);
        }
        console.log(`[${username}] Transaction: Aborting, no change needed or not this client's turn.`); // Debug log
        return; // Abort transaction if no change needed or not this client's turn to set
      }).then((result) => {
        if (result.committed) {
          console.log(`[${username}] Transaction committed. New game state:`, result.snapshot.val()); // Debug log
        } else {
          console.log(`[${username}] Transaction aborted. Fetching latest state.`); // Debug log
          // If transaction aborted, fetch the latest state to ensure consistency
          // This is crucial if another client succeeded in setting the setter
          get(gameRef).then(gameSnap => {
            const latestGameData = gameSnap.val();
            console.log(`[${username}] Latest game data after abort:`, latestGameData); // Debug log
            if (latestGameData) {
              setSecretSetterId(latestGameData.secretSetterId);
              setIsSecretSetter(latestGameData.secretSetterId === playerId); // Use direct playerId here
            }
          });
        }
      }).catch((error) => {
        console.error(`[${username}] Transaction failed: `, error); // Debug log
      });
    } else {
        console.log(`[${username}] Setter assignment useEffect did not run. Current conditions: gameStarted=${gameStarted}, playerId=${playerId}, username=${username}, playersCount=${Object.keys(players).length}, secretSetterId=${secretSetterId}`); // Debug log
    }
  }, [gameStarted, players, playerId, username, secretSetterId]); // Rerun when gameStarted, players, playerId, username, or secretSetterId change

  const updateGameInDb = (updates) => {
    // This function is for general game state updates, NOT for setter assignment.
    // Setter assignment is handled by the useEffect with runTransaction.
    get(ref(database, 'game')).then(snapshot => {
      const currentGameState = snapshot.val() || {};
      set(ref(database, 'game'), { ...currentGameState, ...updates });
    });
  };

  const startGame = () => {
    if (secretWord.trim() === '') {
      setMessage('Please enter a secret word.');
      return;
    }
    if (totalChances < 1) {
      setMessage('Please set at least 1 chance.');
      return;
    }

    const initialDisplay = Array(secretWord.length).fill('_');
    updateGameInDb({
      secretWord: secretWord.toLowerCase(),
      displayWord: initialDisplay,
      guessedLetters: [],
      chancesLeft: totalChances, // Use user-defined totalChances
      gameStarted: true,
      message: '',
      totalChances: totalChances, // Save user-defined total chances to DB
      // secretSetterId is already set by the transaction logic for the setter
    });
    setShowSecretWordInput(false);
  };

  const handleGuess = () => {
    if (!guess) {
      setMessage('Please enter a letter.');
      return;
    }
    const letter = guess.toLowerCase();
    if (guessedLetters.includes(letter)) {
      setMessage('You already guessed that letter!');
      setGuess('');
      return;
    }

    const newGuessedLetters = [...guessedLetters, letter];
    const newDisplayWord = [...displayWord];
    let correctGuess = false;

    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === letter) {
        newDisplayWord[i] = letter;
        correctGuess = true;
      }
    }

    let newChancesLeft = chancesLeft;
    if (!correctGuess) {
      newChancesLeft--;
    }

    const gameWon = !newDisplayWord.includes('_');
    const gameLost = newChancesLeft === 0;

    let newMessage = '';
    let nextGameStartedState = true;

    if (gameWon || gameLost) {
      nextGameStartedState = false;
      newMessage = gameWon ? `Congratulations, ${username}! You guessed the word!` : `Game Over, ${username}! The word was "${secretWord}".`;

      // When game ends, clear the secretSetterId to allow for a new setter in the next round
      // This will trigger the useEffect transactional setter assignment.
      updateGameInDb({
        displayWord: newDisplayWord,
        guessedLetters: newGuessedLetters,
        chancesLeft: newChancesLeft,
        message: newMessage,
        gameStarted: nextGameStartedState,
        secretSetterId: null, // Set to null to trigger new setter selection via transaction
        totalChances: 0, // Reset total chances
      });
      setGuess('');
      return; // Exit here, as updateGameInDb is called above
    }

    // If game is still ongoing, update only relevant states without touching secretSetterId
    updateGameInDb({
      displayWord: newDisplayWord,
      guessedLetters: newGuessedLetters,
      chancesLeft: newChancesLeft,
      message: newMessage,
      gameStarted: nextGameStartedState,
    });
    setGuess('');
  };

  const resetGame = () => {
    // Explicitly set secretSetterId to null to allow for a new setter to be chosen by transaction logic
    updateGameInDb({
      secretWord: '',
      displayWord: [],
      guessedLetters: [],
      chancesLeft: 0, // Reset to 0 or initial state for next game
      gameStarted: false,
      message: '',
      secretSetterId: null, // Reset setter explicitly to trigger new setter selection via transaction
      totalChances: 0, // Reset total chances
    });
    setSecretWord('');
    setGuess('');
    setShowSecretWordInput(false);
  };

  const handleUsernameSubmit = () => {
    if (username.trim() === '') {
      setMessage('Please enter a username to play.');
      return;
    }
    localStorage.setItem('username', username);
    // Also update the usernameRef here, as it's used in the onConnect callback
    usernameRef.current = username; // Ensure usernameRef is updated
    setGameReady(true); // Set gameReady to true only when Join Game is clicked
    set(ref(database, `players/${playerIdRef.current}`), { active: true, username: username, lastSeen: Date.now() });
    // Setter assignment logic is now handled by the useEffect with transaction
  };

  const sendChatMessage = () => {
    if (newMessage.trim() === '') return;

    const chatMessageRef = push(ref(database, 'game_chat')); // Push generates a unique ID
    set(chatMessageRef, {
      senderId: playerIdRef.current,
      senderUsername: usernameRef.current, // Use ref for latest username
      text: newMessage,
      timestamp: Date.now(),
    });
    setNewMessage(''); // Clear the input field
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-fuchsia-300 to-indigo-400 relative overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 p-6 xs:p-8 rounded-3xl bg-white/30 backdrop-blur-lg shadow-2xl max-w-2xl w-full text-center border border-white/40"
      >
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-fuchsia-800 mb-4 drop-shadow-lg">
          Word Guessing Game
        </h2>

        {!gameReady && (
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2">Please enter your username to play:</p>
            <input
              type="text"
              className="w-full max-w-sm p-3 rounded-xl border border-pink-300 bg-white/70 text-gray-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              maxLength="15"
            />
            <button
              onClick={handleUsernameSubmit}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
            >
              Join Game
            </button>
          </div>
        )}

        {gameReady && (
          <>
            <p className="text-md text-gray-700 mb-4">Hello, <span className="font-bold text-fuchsia-700">{username}</span>!</p>

            {!gameStarted && isSecretSetter && !showSecretWordInput && (
              <>
                <p className="text-lg text-gray-700 mb-2">You are the secret word setter.</p>
                <button
                  onClick={() => setShowSecretWordInput(true)}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                >
                  Set Secret Word
                </button>
              </>
            )}

            {!gameStarted && isSecretSetter && showSecretWordInput && (
              <div className="mb-6">
                <p className="text-lg text-gray-700 mb-2">Enter the secret word for others to guess:</p>
                <input
                  type="password"
                  className="w-full max-w-sm p-3 rounded-xl border border-pink-300 bg-white/70 text-gray-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-3"
                  value={secretWord}
                  onChange={(e) => setSecretWord(e.target.value)}
                  placeholder="Type your secret word here"
                />
                <p className="text-lg text-gray-700 mb-2">Set the number of chances (e.g., {secretWord.length + 2} for word length + 2):</p>
                <input
                  type="number"
                  className="w-full max-w-sm p-3 rounded-xl border border-pink-300 bg-white/70 text-gray-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={totalChances}
                  onChange={(e) => setTotalChances(parseInt(e.target.value) || 0)}
                  placeholder="Number of chances"
                  min="1"
                />
                <button
                  onClick={startGame}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                >
                  Start Game
                </button>
              </div>
            )}

            {gameStarted && (
              <div className="mb-6">
                <p className="text-xl md:text-3xl font-bold tracking-widest text-fuchsia-700 mb-4 flex justify-center space-x-2">
                  {displayWord.map((char, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center w-10 h-10 border-2 border-fuchsia-500 rounded-md bg-fuchsia-100 text-fuchsia-800 uppercase"
                    >
                      {char === '_' ? '' : char}
                    </span>
                  ))}
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  {Array.from({ length: totalChances }).map((_, index) => (
                    <span
                      key={index}
                      className={`w-8 h-2 rounded-full ${index < (totalChances - chancesLeft) ? 'bg-red-500' : 'bg-green-500'}`}
                    ></span>
                  ))}
                </div>
                <p className="text-md text-gray-700 mb-4">Guessed Letters: {guessedLetters.join(', ')}</p>

                {!isSecretSetter && (
                  <div className="flex flex-col items-center">
                    <p className="text-lg text-gray-700 mb-2">It's your turn to guess, <span className="font-bold text-fuchsia-700">{username}</span>!</p>
                    <input
                      type="text"
                      maxLength="1"
                      className="w-full max-w-xs p-3 rounded-xl border border-pink-300 bg-white/70 text-gray-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Guess a letter"
                    />
                    <button
                      onClick={handleGuess}
                      className="mt-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                    >
                      Guess Letter
                    </button>
                  </div>
                )}
                {isSecretSetter && (
                  <p className="text-lg text-gray-700">Waiting for <span className="font-bold text-fuchsia-700">{Object.values(players).find(p => p.active && p.username && p.playerId === secretSetterIdRef.current)?.username || 'another player'}</span> to guess...</p>
                )}
              </div>
            )}

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mt-4 text-lg font-semibold ${chancesLeft === 0 || (!displayWord.includes('_') && displayWord.length > 0) ? 'text-green-600' : 'text-red-600'}`}
              >
                {message}
              </motion.p>
            )}

            {(chancesLeft === 0 || (!displayWord.includes('_') && displayWord.length > 0)) && (
              <button
                onClick={resetGame}
                className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
              >
                Play Again
              </button>
            )}

            {!gameStarted && !isSecretSetter && secretSetterId && (
              <p className="text-lg text-gray-700">Waiting for <span className="font-bold text-fuchsia-700">{Object.values(players).find(p => p.active && p.username && p.playerId === secretSetterId)?.username || 'the secret word setter'}</span> to set the secret word...</p>
            )}

            {!gameStarted && !isSecretSetter && !secretSetterId && (
              <p className="text-lg text-gray-700">Waiting for another player to join and set the secret word...</p>
            )}

            {/* Chat Feature */}
            <div className="mt-8 w-full max-w-lg mx-auto bg-white/40 rounded-xl p-4 shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Game Chat</h3>
              <div className="h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 mb-3 bg-gray-50/70 text-left custom-scrollbar">
                {messages.map((msg, index) => (
                  <div key={msg.id || index} className="mb-1">
                    <span className="font-semibold text-purple-800">{msg.senderUsername}:</span> {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} /> {/* Element to scroll to */}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow p-2 rounded-l-lg border border-pink-300 bg-white/80 text-gray-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') sendChatMessage(); }}
                  placeholder="Type your message..."
                />
                <button
                  onClick={sendChatMessage}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-r-lg shadow-md transition-all duration-300"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default GamePage; 