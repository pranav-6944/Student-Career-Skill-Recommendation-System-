import { test, expect } from '@playwright/test';

test.describe('Student Career & Skill Recommendation System E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Landing page loads and displays key sections', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Vite \+ React|CareerPath AI/);
    
    // Check Hero section CTA (exact match)
    const analyzeBtn = page.getByRole('button', { name: 'Analyze My Resume', exact: true });
    await expect(analyzeBtn).toBeVisible();

    const exploreBtn = page.getByRole('button', { name: /Explore Student Dashboard/i });
    await expect(exploreBtn).toBeVisible();
  });

  test('Navigate to Dashboard from Landing Page', async ({ page }) => {
    const exploreBtn = page.getByRole('button', { name: /Explore Student Dashboard/i });
    await exploreBtn.click();
    
    // Should now be on Auth view
    await expect(page.getByText('Welcome back')).toBeVisible();
    
    // Click Sign In
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should now be in the WebApp view
    await expect(page.getByText('Student Career Dashboard')).toBeVisible();
    await expect(page.getByRole('button', { name: /Upload New Resume/i })).toBeVisible();
  });

  test('Dashboard Sidebar Navigation works correctly', async ({ page }) => {
    // Enter app
    await page.getByRole('button', { name: /Explore Student Dashboard/i }).click();
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'password');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Default view is dashboard
    await expect(page.getByText('Student Career Dashboard')).toBeVisible();

    // Click Resume Upload & Parser
    await page.getByRole('button', { name: /Resume Upload & Parser/i }).click();
    await expect(page.getByText('Resume Parser & Analyzer')).toBeVisible();

    // Click Career Matches
    await page.getByRole('navigation').getByRole('button', { name: 'Career Matches', exact: false }).click();
    await expect(page.getByRole('heading', { name: 'Career Role Matches' })).toBeVisible();

    // Click Skill Gap Matrix
    await page.getByRole('navigation').getByRole('button', { name: 'Skill Gap Matrix', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Skill Gap Matrix', exact: true })).toBeVisible();

    // Click Learning Path
    await page.getByRole('navigation').getByRole('button', { name: 'Learning Path', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Personalized Learning Roadmap' })).toBeVisible();
  });

  test('Internal Dashboard Navigation Links Work', async ({ page }) => {
    // Enter app
    await page.getByRole('button', { name: /Explore Student Dashboard/i }).click();
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'password');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // From Dashboard, click "Skill Gap Matrix →" on a career match
    const skillGapBtn = page.getByRole('button', { name: /Skill Gap Matrix/i }).first();
    await skillGapBtn.click();
    
    // Should now be on Skill Gap Analysis page
    await expect(page.getByRole('heading', { name: 'Skill Gap Matrix', exact: true })).toBeVisible();
    
    // From Skill Gap Analysis, click "Find Courses →"
    const findCoursesBtn = page.getByRole('button', { name: /Find Courses/i }).first();
    await findCoursesBtn.click();
    
    // Should now be on Learning Path
    await expect(page.getByRole('heading', { name: 'Personalized Learning Roadmap' })).toBeVisible();
  });

  test('Log Out button resets session', async ({ page }) => {
    // Enter app
    await page.getByRole('button', { name: /Explore Student Dashboard/i }).click();
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'password');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Dashboard is visible
    await expect(page.getByText('Student Career Dashboard')).toBeVisible();
    
    // Open profile dropdown
    const profileBtn = page.getByRole('button', { name: /Ashwini Kate/i });
    await profileBtn.click();
    
    // Click Log Out
    const logoutBtn = page.getByRole('button', { name: /Log Out/i });
    await logoutBtn.click();
    
    // Should redirect to auth and show welcome back again
    await expect(page.getByText('Welcome back')).toBeVisible();
    
    // Dashboard should not be visible
    await expect(page.getByText('Student Career Dashboard')).not.toBeVisible();
  });
});
