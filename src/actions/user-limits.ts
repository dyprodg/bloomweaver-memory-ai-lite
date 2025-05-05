"use server";

import { getUserTier } from "@/lib/user-tier";
import {
  checkAndUpdatePeriod,
  getUserLimit,
  setUserLimit,
  refreshUserLimit,
  TIER_LIMITS
} from "@/lib/user-limits";
import { isUserInitialized, initializeNewUser } from "@/lib/user-setup";

interface CheckLimitResult {
  success: boolean;
  remainingMessages: number;
  error?: string;
}

/**
 * Check if a user has remaining message limits
 * Currently disabled - all requests succeed with unlimited messages
 * Original implementation preserved in comments below
 */
export async function checkAndDecrementUserLimit(
  userId: string
): Promise<CheckLimitResult> {
  // Always return success with unlimited messages
  return {
    success: true,
    remainingMessages: Infinity,
  };

  /* Original implementation with limits:
  try {
    // First, check if the user is initialized, and if not, initialize them
    const initialized = await isUserInitialized(userId);
    if (!initialized) {
      await initializeNewUser(userId);
    }
    
    // Get the user's tier from database
    const tier = await getUserTier(userId);
    
    // Check and potentially refresh period if it's a new month
    await checkAndUpdatePeriod(userId, tier);
    
    // Get the current limit after potential refresh
    const currentLimit = await getUserLimit(userId);
    
    // Check if the user has remaining messages
    if (currentLimit <= 0) {
      return {
        success: false,
        remainingMessages: 0,
        error: "You've reached your message limit for this month",
      };
    }
    
    // Decrement the limit
    const newLimit = currentLimit - 1;
    await setUserLimit(userId, newLimit);
    
    return {
      success: true,
      remainingMessages: newLimit,
    };
  } catch (error) {
    console.error("Error checking user limit:", error);
    return {
      success: false,
      remainingMessages: 0,
      error: "An error occurred while checking your message limit",
    };
  }
  */
}

/**
 * Get user's remaining message count
 * Currently returns unlimited messages
 */
export async function getUserRemainingMessages(
  userId: string
): Promise<{ limit: number; tier: string }> {
  // Get the user's tier from database
  const tier = await getUserTier(userId);
  
  return {
    limit: Infinity,
    tier,
  };

  /* Original implementation with limits:
  // First, check if the user is initialized, and if not, initialize them
  const initialized = await isUserInitialized(userId);
  if (!initialized) {
    await initializeNewUser(userId);
  }
  
  // Get the user's tier from database
  const tier = await getUserTier(userId);
  
  // Check and potentially refresh period if it's a new month
  await checkAndUpdatePeriod(userId, tier);
  
  // Get the current limit
  const limit = await getUserLimit(userId);
  
  return {
    limit,
    tier,
  };
  */
} 