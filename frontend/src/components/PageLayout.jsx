/**
 * PageLayout — shared premium shell for all inner pages.
 * Wraps content with ambient orbs, back nav, and consistent container.
 */
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function PageLayout({ children, badge, backTo = '/', backLabel = 'Dashboard' }) {
  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />
      <div className="orb orb-cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back nav + badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-up">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {backLabel}
          </Link>
          {badge && (
            <div className="page-badge">
              <Sparkles className="w-3 h-3" /> {badge}
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
