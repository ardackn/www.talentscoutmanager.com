"use client"


import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EnterpriseCheckout() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center px-4 py-16 text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center">
          🎯
        </div>
        <h1 className="text-4xl font-black font-clash mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Enterprise Plan Active
        </h1>
        <p className="text-xl text-slate-300 mb-8 font-dm">
          Your team is ready for elite talent discovery.
        </p>
        <div className="space-y-4 mb-12 text-left text-sm text-slate-400">
          <div className="flex justify-between"><span>Enterprise Plan</span><span>$149/month</span></div>
          <div className="flex justify-between"><span>Next billing</span><span>July 25</span></div>
          <div className="flex justify-between"><span>Seats</span><span>Unlimited</span></div>
          <div className="pt-4 border-t border-white/10 flex justify-between"><span>Status</span><span className="font-bold text-purple-400">Active</span></div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="space-y-3">
          <Link href="/scout/overview">
            <button className="w-full py-6 px-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-2xl font-clash text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all">
              Access Dashboard →
            </button>
          </Link>
          <Link href="/scout/overview" className="text-sm underline text-slate-400 hover:text-white">
            Team Management
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
