import { ModelTier } from "./groq-models";
import { redis } from "./redis";

// Redis key for user tier
const getUserTierKey = (userId: string) => `user:${userId}:tier`;

/**
 * Get a user's subscription tier by userId
 * Fetches from Redis database or defaults to free
 * 
 * Works for both client and server contexts
 */
export async function getUserTier(userId: string): Promise<ModelTier> {
  try {
    // Get tier from Redis
    const tier = await redis.get<string>(getUserTierKey(userId));
    
    // Validate that it's a valid tier
    if (tier && (tier === "free" || tier === "basic" || tier === "premium")) {
      return tier as ModelTier;
    }
    
    // Default to free tier if not found or invalid
    return "free";
  } catch (error) {
    console.error("Error fetching tier from database");
    return "free"; // Default to free tier on error
  }
}

/**
 * Set a user's subscription tier
 * Stores in Redis database
 */
export async function setUserTier(userId: string, tier: ModelTier): Promise<void> {
  await redis.set(getUserTierKey(userId), tier);
}

/**
 * Format a tier name for display
 */
export function formatTierName(tier: ModelTier): string {
  const germanTierNames: Record<ModelTier, string> = {
    "free": "Kostenlos",
    "basic": "Basis",
    "premium": "Premium"
  };
  
  return germanTierNames[tier] || tier.charAt(0).toUpperCase() + tier.slice(1);
}

/**
 * Get tier upgrade information
 */
export function getTierUpgradeInfo(currentTier: ModelTier): { 
  canUpgrade: boolean; 
  nextTier?: ModelTier;
  upgradeText: string;
} {
  switch (currentTier) {
    case "free":
      return { 
        canUpgrade: true, 
        nextTier: "basic",
        upgradeText: "Upgrade auf Basis" 
      };
    case "basic":
      return { 
        canUpgrade: true, 
        nextTier: "premium",
        upgradeText: "Upgrade auf Premium" 
      };
    case "premium":
      return { 
        canUpgrade: false,
        upgradeText: "Abonnement verwalten" 
      };
    default:
      return { 
        canUpgrade: false,
        upgradeText: "Pläne anzeigen" 
      };
  }
} 