"use client";

import React from 'react';
import { TestSupabase } from '@/components/TestSupabase';

export default function TestSupabasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TestSupabase />
      </div>
    </div>
  );
}