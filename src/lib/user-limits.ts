import { ModelTier } from "./groq-models";
import { redis } from "./redis";

// Define limits for each tier (currently disabled)
export interface TierLimits {
  messageLimit: number;
}

export const TIER_LIMITS: Record<ModelTier, TierLimits> = {
  free: {
    messageLimit: Infinity,
  },
  basic: {
    messageLimit: Infinity,
  },
  premium: {
    messageLimit: Infinity,
  },
};

/* Original tier limits:
export const TIER_LIMITS: Record<ModelTier, TierLimits> = {
  free: {
    messageLimit: 200,
  },
  basic: {
    messageLimit: 1000,
  },
  premium: {
    messageLimit: 10000,
  },
};
*/

// Redis key helpers
const getUserLimitKey = (userId: string) => `user:${userId}:limit`;
const getUserPeriodKey = (userId: string) => `user:${userId}:period`;

/**
 * Get the current message limit for a user (currently returns Infinity)
 */
export async function getUserLimit(userId: string): Promise<number> {
  return Infinity;
  /* Original implementation:
  const currentLimit = await redis.get<number>(getUserLimitKey(userId));
  return currentLimit ?? 0;
  */
}

/**
 * Get the last period refresh date for a user (currently disabled)
 */
export async function getUserPeriodDate(userId: string): Promise<Date | null> {
  return new Date(); // Always return current date since limits are disabled
  /* Original implementation:
  const periodDate = await redis.get<string>(getUserPeriodKey(userId));
  return periodDate ? new Date(periodDate) : null;
  */
}

/**
 * Set the user's message limit (currently disabled)
 */
export async function setUserLimit(userId: string, limit: number): Promise<void> {
  // No-op since limits are disabled
  /* Original implementation:
  await redis.set(getUserLimitKey(userId), limit);
  */
}

/**
 * Set the user's period refresh date (currently disabled)
 */
export async function setUserPeriodDate(userId: string, date: Date): Promise<void> {
  // No-op since limits are disabled
  /* Original implementation:
  await redis.set(getUserPeriodKey(userId), date.toISOString());
  */
}

/**
 * Check if the period needs to be refreshed (currently disabled)
 */
export function isPeriodExpired(lastRefreshDate: Date): boolean {
  return false; // Never expired since limits are disabled
  /* Original implementation:
  const now = new Date();
  
  // Different calendar month or year
  return (
    now.getMonth() !== lastRefreshDate.getMonth() ||
    now.getFullYear() !== lastRefreshDate.getFullYear()
  );
  */
}

/**
 * Initialize or refresh a user's limit based on their tier (currently disabled)
 */
export async function refreshUserLimit(userId: string, tier: ModelTier): Promise<void> {
  // No-op since limits are disabled
  /* Original implementation:
  const limit = TIER_LIMITS[tier].messageLimit;
  await setUserLimit(userId, limit);
  await setUserPeriodDate(userId, new Date());
  */
}

/**
 * Check and update a user's period if needed (currently disabled)
 */
export async function checkAndUpdatePeriod(userId: string, tier: ModelTier): Promise<boolean> {
  return false; // Never needs update since limits are disabled
  /* Original implementation:
  const lastPeriodDate = await getUserPeriodDate(userId);
  
  // If no period date or period is expired, refresh
  if (!lastPeriodDate || isPeriodExpired(lastPeriodDate)) {
    await refreshUserLimit(userId, tier);
    return true;
  }
  
  return false;
  */
} 