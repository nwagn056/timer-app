import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(30);

  const resetTimer = useCallback(() => {
    setElapsed(0);
    setIsRunning(false);
  }, []);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const updateDuration = useCallback((newDuration) => {
    setDuration(newDuration);
  }, []);

  useEffect(() => {
    let intervalId;
    
    if (isRunning && elapsed < duration) {
      intervalId = setInterval(() => {
        setElapsed(prev => {
          const newElapsed = prev + 0.1;
          if (newElapsed >= duration) {
            setIsRunning(false);
            return duration;
          }
          return newElapsed;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, duration, elapsed]);

  const progress = (elapsed / duration) * 100;

  return (
    <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Duration Setting */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Duration: {duration.toFixed(1)}s
          </label>
          <input
            type="range"
            min="1"
            max="60"
            value={duration}
            onChange={(e) => updateDuration(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Progress: {elapsed.toFixed(1)}s
          </label>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center justify-center p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;