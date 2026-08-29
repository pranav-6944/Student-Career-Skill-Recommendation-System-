import { test, expect } from '@playwright/test';

test.describe('Student Career & Skill Recommendation System E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ===== LANDING PAGE TESTS =====
  test('Landing page loads and displays key sections', async ({ page }) => {
    await expect(page).toHaveTitle(/Vite \+ React|CareerPath AI/);

    // Hero CTAs
    const analyzeBtn = page.getByRole('button', { name: 'Analyze My Resume', exact: true });
    await expect(analyzeBtn).toBeVisible();

    const exploreBtn = page.getByRole('button', { name: /Explore Student Dashboard/i });
    await expect(exploreBtn).toBeVisible();

    // Navbar Launch App button should be visible on website mode
    const launchBtn = page.getByRole('button', { name: /Launch App/i });
    await expect(launchBtn).toBeVisible();

    // Profile dropdown should NOT be visible on landing page (unauthenticated)
    const profileBtn = page.getByRole('button', { name: /Ashwini Kate/i });
    await expect(profileBtn).not.toBeVisible();
  });

  // ===== AUTH FLOW TESTS =====
  test('Sign In page appears when clicking Launch App', async ({ page }) => {
    await page.getByRole('button', { name: /Launch App/i }).click();
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('Demo Credentials')).toBeVisible();
  });

  test('Student login works with correct credentials', async ({ page }) => {
    await page.getByRole('button', { name: /Launch App/i }).click();
    await expect(page.getByText('Welcome back')).toBeVisible();

    await page.fill('input[type="email"]', 'ashwini@student.com');
    await page.fill('input[type="password"]', 'student123');
    await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();

    // Wait for login animation (800ms timeout in SignInView)
    await expect(page.getByText('Student Career Dashboard')).toBeVisible({ timeout: 3000 });
  });

  test('Admin login works with correct credentials', async ({ page }) => {
    await page.getByRole('button', { name: /Launch App/i }).click();
    await expect(page.getByText('Welcome back')).toBeVisible();

    await page.fill('input[type="email"]', 'admin@careerpath.ai');
    await page.fill('input[type="password"]', 'admin123');
    await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();

    // Admin goes directly to admin console
    await expect(page.getByRole('heading', { name: /Institutional Admin Console/i })).toBeVisible({ timeout: 3000 });
  });

  test('Sign up / Sign in toggle works correctly', async ({ page }) => {
    await page.getByRole('button', { name: /Launch App/i }).click();
    await expect(page.getByText('Welcome back')).toBeVisible();

    // Toggle to sign up
    await page.getByRole('button', { name: /Sign up for free/i }).click();
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();

    // Toggle back to sign in
    await page.getByRole('button', { name: /Sign in here/i }).click();
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('Demo Credentials')).toBeVisible();
  });

  // ===== HELPER: login as student =====
  const loginAsStudent = async (page: any) => {
    await page.getByRole('button', { name: /Launch App/i }).click();
    await page.fill('input[type="email"]', 'ashwini@student.com');
    await page.fill('input[type="password"]', 'student123');
    // Click the form submit button specifically (not the navbar Sign In button)
    await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Student Career Dashboard')).toBeVisible({ timeout: 3000 });
  };

  // ===== DASHBOARD NAVIGATION TESTS =====
  test('Dashboard Sidebar Navigation works correctly', async ({ page }) => {
    await loginAsStudent(page);

    // Resume view
    await page.getByRole('navigation').getByRole('button', { name: /Resume Upload/i }).click();
    await expect(page.getByRole('heading', { name: 'Resume Parser & Analyzer' })).toBeVisible();

    // Career Matches view
    await page.getByRole('navigation').getByRole('button', { name: /Career Matches/i }).click();
    await expect(page.getByRole('heading', { name: 'Career Role Matches' })).toBeVisible();

    // Skill Gap view
    await page.getByRole('navigation').getByRole('button', { name: 'Skill Gap Matrix', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Skill Gap Matrix', exact: true })).toBeVisible();

    // Learning Path view
    await page.getByRole('navigation').getByRole('button', { name: 'Learning Path', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Personalized Learning Roadmap' })).toBeVisible();

    // My Profile view
    await page.getByRole('navigation').getByRole('button', { name: /My Profile/i }).click();
    await expect(page.getByRole('heading', { name: 'Student Profile Settings' })).toBeVisible();
  });

  test('Internal navigation links work (Skill Gap → Learning Path)', async ({ page }) => {
    await loginAsStudent(page);

    // Click Skill Gap from career card on dashboard
    const skillGapBtn = page.getByRole('button', { name: /Skill Gap/i }).first();
    await skillGapBtn.click();
    await expect(page.getByRole('heading', { name: 'Skill Gap Matrix', exact: true })).toBeVisible();

    // Click Find Courses from Skill Gap
    const findCoursesBtn = page.getByRole('button', { name: /Find Courses/i }).first();
    await findCoursesBtn.click();
    await expect(page.getByRole('heading', { name: 'Personalized Learning Roadmap' })).toBeVisible();
  });

  // ===== LOGOUT TEST =====
  test('Log Out button from sidebar redirects to Sign In', async ({ page }) => {
    await loginAsStudent(page);
    await expect(page.getByText('Student Career Dashboard')).toBeVisible();

    // Sidebar log out button
    const logoutBtn = page.getByRole('button', { name: /Log Out/i }).first();
    await logoutBtn.click();

    // Should redirect to Sign In page
    await expect(page.getByText('Welcome back')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Student Career Dashboard')).not.toBeVisible();
  });

  test('Log Out via Navbar profile dropdown redirects to Sign In', async ({ page }) => {
    await loginAsStudent(page);

    // Profile dropdown only visible when authenticated
    const profileBtn = page.getByRole('button', { name: /Ashwini Kate/i });
    await profileBtn.click();

    const logoutBtn = page.getByRole('button', { name: /Log Out/i }).last();
    await logoutBtn.click();

    await expect(page.getByText('Welcome back')).toBeVisible({ timeout: 3000 });
  });
});
