import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

function OfferCard({
  offer,
  status,
  code,
}: {
  offer: string;
  status: string;
  code: string;
}) {
  // All cards use light pastel green - no dark variants
  const getGradient = () => {
    if (status.toLowerCase().includes("premium")) {
      return "bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]";
    } else if (status.toLowerCase().includes("new")) {
      return "bg-gradient-to-br from-[#f1f8e9] to-[#dcedc8]";
    }
    return "bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9]";
  };

  // Get emoji based on status
  const getEmoji = () => {
    if (status.toLowerCase().includes("premium")) return "⭐";
    if (status.toLowerCase().includes("bulk")) return "📦";
    if (status.toLowerCase().includes("agro")) return "🌾";
    if (status.toLowerCase().includes("new")) return "✨";
    return "🎁";
  };

  return (
    <div className={`min-w-60 h-[190px] ${getGradient()} shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden rounded-xl border border-green-100`}>
      {/* Status Badge */}
      <div className="px-4 pt-3 pb-2">
        <span className="inline-block font-semibold text-green-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[0.75rem] shadow-sm">
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="font-bold text-green-800 text-[0.95rem] leading-tight max-w-[65%] mb-2">
          {offer}
        </p>

        {/* Coupon Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full border-2 border-dashed border-green-300 shadow-sm">
          <span className="text-xs">🏷️</span>
          <span className="font-bold text-green-700 text-xs">{code}</span>
        </div>
      </div>

      {/* Decorative Emoji */}
      <div className="absolute right-2 bottom-2 text-6xl opacity-20 pointer-events-none">
        {getEmoji()}
      </div>
    </div>
  );
}

export default OfferCard;
