'use client';

import React, { useState } from 'react';
import { Type, Check } from 'lucide-react';

export function FontTester() {
  const [isOpen, setIsOpen] = useState(false);
  const [sampleText, setSampleText] = useState('Sphinx of black quartz, judge my vow 0123456789');

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 backdrop-blur-sm shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
              <Type className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-slate-900 flex items-center gap-2">
                Font Verification Sandbox
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <Check className="h-3 w-3" /> 4 Fonts Loaded
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-manrope">
                Previewing Nohemi, Oakes Grotesk, Manrope, and Outfit across different weights.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Type custom text..."
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 shadow-2xs focus:border-slate-400 focus:outline-none w-64"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs"
            >
              {isOpen ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Nohemi */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Nohemi (Local Font)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">.font-nohemi</span>
              </div>
              <div className="space-y-3 font-nohemi">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Regular (400)</span>
                  <p className="text-xl font-normal text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Medium (500)</span>
                  <p className="text-xl font-medium text-slate-900">{sampleText}</p>
                </div>
              </div>
            </div>

            {/* 2. Oakes Grotesk */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Oakes Grotesk (Local Font)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">.font-oakes</span>
              </div>
              <div className="space-y-2.5 font-oakes">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Light (300)</span>
                  <p className="text-lg font-light text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Regular (400)</span>
                  <p className="text-lg font-normal text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Medium (500)</span>
                  <p className="text-lg font-medium text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">SemiBold (600)</span>
                  <p className="text-lg font-semibold text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Bold (700)</span>
                  <p className="text-lg font-bold text-slate-900">{sampleText}</p>
                </div>
              </div>
            </div>

            {/* 3. Manrope */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Manrope (Google Font)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">.font-manrope</span>
              </div>
              <div className="space-y-3 font-manrope">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Regular (400)</span>
                  <p className="text-lg font-normal text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Bold (700)</span>
                  <p className="text-lg font-bold text-slate-900">{sampleText}</p>
                </div>
              </div>
            </div>

            {/* 4. Outfit */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Outfit (Google Font)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">.font-outfit</span>
              </div>
              <div className="space-y-3 font-outfit">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Regular (400)</span>
                  <p className="text-lg font-normal text-slate-900">{sampleText}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Bold (700)</span>
                  <p className="text-lg font-bold text-slate-900">{sampleText}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
