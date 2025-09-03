
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Clock, Brain, Sparkles, Eye, Target } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-indigo via-dream-violet to-midnight-indigo">
      {/* Hero Section */}
      <div className="container pt-20 pb-16 text-center relative">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-aqua-glow/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-dream-violet/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-aqua-glow/20 p-6 rounded-full border border-aqua-glow/30">
              <div className="relative">
                <Moon className="h-16 w-16 text-aqua-glow animate-float" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-aqua-glow rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-lunar-silver to-aqua-glow bg-clip-text text-transparent">
              Noira
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-lunar-silver/90 mb-4">
            Where night meets clarity.
          </p>
          
          <p className="max-w-2xl mx-auto text-lg text-lunar-silver/70 mb-12">
            Unlock the power of lucid dreaming with guided rituals, journaling, and awareness tools.
            Where night becomes your superpower.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-aqua-glow to-dream-violet hover:from-aqua-glow/80 hover:to-dream-violet/80 text-midnight-indigo font-semibold px-10 py-4 text-lg rounded-2xl">
                Start Dreaming Today
              </Button>
            </Link>
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-2xl font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Your Gateway to Lucid Worlds
          </h2>
          <p className="text-xl text-lunar-silver/70 max-w-2xl mx-auto">
            Comprehensive tools designed to guide you from dream novice to lucid master
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300">
            <div className="bg-aqua-glow/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Brain className="h-10 w-10 text-aqua-glow" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">AI Dream Analysis</h3>
            <p className="text-lunar-silver/70">
              Advanced AI identifies themes, emotions, and lucidity indicators in your dreams automatically.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300">
            <div className="bg-dream-violet/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Target className="h-10 w-10 text-dream-violet" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Guided Rituals</h3>
            <p className="text-lunar-silver/70">
              Practice MILD, reality checks, and awareness techniques with step-by-step guidance.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300">
            <div className="bg-lunar-silver/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Eye className="h-10 w-10 text-lunar-silver" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Reality Awareness</h3>
            <p className="text-lunar-silver/70">
              Build awareness habits that carry into your dreams with customizable check reminders.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300 md:col-span-1 lg:col-span-1">
            <div className="bg-aqua-glow/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Moon className="h-10 w-10 text-aqua-glow" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Dream Journal</h3>
            <p className="text-lunar-silver/70">
              Capture dreams with voice or text. Search and filter your dream archive effortlessly.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300 md:col-span-1 lg:col-span-1">
            <div className="bg-dream-violet/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="h-10 w-10 text-dream-violet" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Lucidity Tracking</h3>
            <p className="text-lunar-silver/70">
              Monitor your progress with streak tracking and personalized insights for growth.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="bg-lunar-silver/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-10 w-10 text-lunar-silver" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Smart Scheduling</h3>
            <p className="text-lunar-silver/70">
              Optimize your practice with intelligent reminders and ritual scheduling.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-aqua-glow/5 via-dream-violet/5 to-aqua-glow/5 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-12 rounded-3xl border border-white/20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Master Your Dreams?
          </h2>
          <p className="text-xl text-lunar-silver/80 mb-8 max-w-2xl mx-auto">
            Join thousands discovering the power of conscious dreaming. Your journey to lucidity starts tonight.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-aqua-glow to-dream-violet hover:from-aqua-glow/80 hover:to-dream-violet/80 text-midnight-indigo font-semibold px-10 py-4 text-lg rounded-2xl">
                Begin Your Journey
              </Button>
            </Link>
          </div>
          <p className="text-lunar-silver/60 text-sm">
            "Noira is the modern tool for dream journaling, lucidity, and guided rituals — where night becomes your superpower."
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="container py-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Moon className="h-6 w-6 text-aqua-glow" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-aqua-glow rounded-full animate-pulse"></div>
          </div>
          <span className="ml-2 font-heading font-bold text-xl bg-gradient-to-r from-dream-violet to-aqua-glow bg-clip-text text-transparent">
            Noira
          </span>
        </div>
        <p className="text-lunar-silver/60 text-sm mb-2">
          © {new Date().getFullYear()} Noira. Where night meets clarity.
        </p>
        <p className="text-lunar-silver/40 text-xs">
          Unlock the world of lucid dreaming. Dream. Remember. Awaken.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
