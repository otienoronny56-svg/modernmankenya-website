'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2, Bot } from 'lucide-react';

interface HumanVerificationCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  isVerified: boolean;
}

export const HumanVerificationCaptcha: React.FC<HumanVerificationCaptchaProps> = ({
  onVerify,
  isVerified,
}) => {
  const [numA, setNumA] = useState<number>(3);
  const [numB, setNumB] = useState<number>(4);
  const [operator, setOperator] = useState<'+' | '-'>('+');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);

  const generateNewChallenge = useCallback(() => {
    const isAddition = Math.random() > 0.3;
    if (isAddition) {
      const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const b = Math.floor(Math.random() * 8) + 1; // 1 to 8
      setNumA(a);
      setNumB(b);
      setOperator('+');
    } else {
      const a = Math.floor(Math.random() * 9) + 6; // 6 to 14
      const b = Math.floor(Math.random() * 5) + 1; // 1 to 5
      setNumA(a);
      setNumB(b);
      setOperator('-');
    }
    setUserAnswer('');
    setHasError(false);
  }, []);

  useEffect(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  const correctAnswer = operator === '+' ? numA + numB : numA - numB;

  const handleCheckboxClick = () => {
    if (isVerified) return;
    setIsChecked(true);
    setShowChallenge(true);
  };

  const handleVerifyAnswer = (val: string) => {
    setUserAnswer(val);
    const parsed = parseInt(val.trim(), 10);
    if (!isNaN(parsed) && parsed === correctAnswer) {
      setHasError(false);
      onVerify(true);
    } else {
      onVerify(false);
      if (val.trim().length >= String(correctAnswer).length) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50/70 dark:bg-slate-800/50 p-3 sm:p-3.5 space-y-2.5 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-brand-gold" />
          <span className="text-xs font-semibold text-stone-800 dark:text-slate-200">
            Security Verification
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-slate-400 font-medium">
          Anti-Bot Protection
        </span>
      </div>

      {!isVerified ? (
        <div className="space-y-2.5 pt-0.5">
          {/* 1. "I am not a robot" Checkbox trigger */}
          <div
            onClick={handleCheckboxClick}
            className={`flex items-center space-x-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
              isChecked
                ? 'border-brand-gold/60 bg-amber-50/40 dark:bg-amber-950/20'
                : 'border-stone-300 dark:border-slate-600 bg-white dark:bg-[#182238] hover:border-brand-gold/50'
            }`}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                isChecked
                  ? 'bg-brand-navy dark:bg-brand-gold border-brand-navy dark:border-brand-gold text-brand-gold dark:text-brand-navy'
                  : 'border-stone-400 dark:border-slate-500 bg-white dark:bg-slate-800'
              }`}
            >
              {isChecked ? (
                <div className="w-2 h-2 rounded-full bg-current" />
              ) : null}
            </div>
            <div className="flex-1 text-xs font-medium text-stone-700 dark:text-slate-300 select-none">
              I am not a robot
            </div>
            <Bot className="w-4 h-4 text-stone-400 dark:text-slate-500" />
          </div>

          {/* 2. Interactive Math Challenge */}
          {showChallenge && (
            <div className="p-2.5 bg-white dark:bg-[#182238] rounded-lg border border-brand-gold/40 shadow-xs space-y-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 dark:text-slate-300 font-medium">
                  Solve to verify:
                </span>
                <button
                  type="button"
                  onClick={generateNewChallenge}
                  className="text-[11px] text-stone-500 hover:text-brand-gold transition-colors inline-flex items-center space-x-1"
                  title="Generate a new question"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="flex items-center space-x-2.5">
                {/* Visual Math Problem badge */}
                <div className="px-3 py-1.5 rounded-md bg-stone-100 dark:bg-slate-700 text-stone-900 dark:text-slate-100 font-mono font-bold text-sm tracking-widest border border-stone-200 dark:border-slate-600 select-none">
                  {numA} {operator} {numB} = ?
                </div>

                {/* Answer Input */}
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={3}
                  value={userAnswer}
                  onChange={(e) => handleVerifyAnswer(e.target.value)}
                  placeholder="Answer"
                  className={`flex-1 px-3 py-1.5 rounded-md border text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-stone-900 dark:text-white focus:outline-hidden transition-all ${
                    hasError
                      ? 'border-red-400 dark:border-red-600 focus:ring-1 focus:ring-red-400'
                      : 'border-stone-300 dark:border-slate-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
                  }`}
                />
              </div>

              {hasError && (
                <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                  Incorrect answer. Please calculate {numA} {operator} {numB} and re-enter.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        /* 3. Verified Success State */
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Human Verified • Direct Access Granted
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onVerify(false);
              setIsChecked(false);
              generateNewChallenge();
            }}
            className="text-[10px] text-emerald-700 dark:text-emerald-400 hover:underline"
            title="Reset verification"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
