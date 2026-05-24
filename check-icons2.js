const l = require('lucide-react');
const toCheck = [
  'Sparkles','Crown','Scissors','Star','Heart','Camera','Quote',
  'ZoomIn','Zap','Share2','ImageIcon','CheckCircle','XCircle',
  'AlertCircle','SlidersHorizontal','GraduationCap','Tag','UserCog',
  'BarChart3','Building2','Globe','Rss','Play','MessageCircle',
  'ChevronDown','ChevronUp','ChevronLeft','ChevronRight',
  'Menu','X','Search','User','ShoppingBag','MapPin','RotateCcw',
  'BookOpen','TrendingUp','TrendingDown','Upload','Video',
  'ClipboardList','Award','FileText','LogOut','Eye','EyeOff',
  'PlayCircle','Clock','Users','Package','ShoppingCart',
  'Calendar','Settings','MessageSquare'
];
const missing = toCheck.filter(name => !l[name]);
const present = toCheck.filter(name => !!l[name]);
console.log('MISSING:', missing.join(', '));
console.log('PRESENT count:', present.length);
