
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlanLimits {
  candidateLimit: number;
  weeklyComparisons: number;
  dailyComparisons: number;
}

interface UsageStats {
  comparisonsThisWeek: number;
  comparisonsToday: number;
  lastComparisonDate: string;
  weekStartDate: string;
}

interface PlanState {
  currentPlan: 'hire0' | 'hire+' | 'hire%';
  limits: PlanLimits;
  usage: UsageStats;
  canRunComparison: () => boolean;
  recordComparison: () => void;
  upgradePlan: (plan: 'hire+' | 'hire%') => void;
  resetWeeklyUsage: () => void;
}

const PLAN_LIMITS = {
  hire0: { candidateLimit: 5, weeklyComparisons: 1, dailyComparisons: 1 },
  'hire+': { candidateLimit: 10, weeklyComparisons: 5, dailyComparisons: 1 },
  'hire%': { candidateLimit: 20, weeklyComparisons: 10, dailyComparisons: 2 },
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      currentPlan: 'hire0',
      limits: PLAN_LIMITS.hire0,
      usage: {
        comparisonsThisWeek: 0,
        comparisonsToday: 0,
        lastComparisonDate: '',
        weekStartDate: new Date().toISOString(),
      },

      canRunComparison: () => {
        const { limits, usage } = get();
        const today = new Date().toDateString();
        const lastComparisonDay = new Date(usage.lastComparisonDate).toDateString();
        
        const todayUsage = lastComparisonDay === today ? usage.comparisonsToday : 0;
        
        return usage.comparisonsThisWeek < limits.weeklyComparisons && 
               todayUsage < limits.dailyComparisons;
      },

      recordComparison: () => {
        const { usage } = get();
        const today = new Date();
        const todayString = today.toDateString();
        const lastComparisonDay = new Date(usage.lastComparisonDate).toDateString();
        
        const isNewDay = lastComparisonDay !== todayString;
        const weekStart = new Date(usage.weekStartDate);
        const daysSinceWeekStart = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
        
        let newUsage = { ...usage };
        
        if (daysSinceWeekStart >= 7) {
          // Reset weekly usage
          newUsage = {
            comparisonsThisWeek: 1,
            comparisonsToday: 1,
            lastComparisonDate: today.toISOString(),
            weekStartDate: today.toISOString(),
          };
        } else {
          newUsage = {
            ...usage,
            comparisonsThisWeek: usage.comparisonsThisWeek + 1,
            comparisonsToday: isNewDay ? 1 : usage.comparisonsToday + 1,
            lastComparisonDate: today.toISOString(),
          };
        }
        
        set({ usage: newUsage });
      },

      upgradePlan: (plan: 'hire+' | 'hire%') => {
        set({ 
          currentPlan: plan, 
          limits: PLAN_LIMITS[plan] 
        });
      },

      resetWeeklyUsage: () => {
        const today = new Date();
        set({
          usage: {
            comparisonsThisWeek: 0,
            comparisonsToday: 0,
            lastComparisonDate: '',
            weekStartDate: today.toISOString(),
          }
        });
      },
    }),
    {
      name: 'hirelytics-plan',
    }
  )
);
