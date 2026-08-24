import { test, expect } from "@playwright/test";

test.describe("Portfolio E2E", () => {
  test("loads homepage and displays hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Muhammad Bilal Hussain")).toBeVisible();
    await expect(page.getByText("Frontend AI Engineering Intern")).toBeVisible();
  });

  test("navigation links scroll to correct sections", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Projects" }).click();
    await expect(page.getByText("Featured")).toBeVisible();

    await page.getByRole("link", { name: "Skills" }).click();
    await expect(page.getByText("Skills & Technologies")).toBeVisible();

    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page.getByText("Get In Touch")).toBeVisible();
  });

  test("contact form shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Contact" }).click();
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Subject is required")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();
  });

  test("contact form validates email format", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Contact" }).click();
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("invalid-email");
    await page.getByLabel("Subject").fill("Test Subject");
    await page.getByLabel("Message").fill("This is a test message for validation.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("skills section filters by category", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Skills" }).click();
    await expect(page.getByText("React")).toBeVisible();

    await page.getByRole("button", { name: /frontend/i }).click();
    await expect(page.getByText("React")).toBeVisible();
    await expect(page.getByText("Node.js")).not.toBeVisible();
  });

  test("projects section displays all project cards", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Projects" }).click();
    await expect(page.getByText("FlyRank Dashboard")).toBeVisible();
    await expect(page.getByText("AI Review Analyzer")).toBeVisible();
    await expect(page.getByText("SEO Audit Tool")).toBeVisible();
  });

  test("footer contains social links", async ({ page }) => {
    await page.goto("/");

    const githubLink = page.getByLabelText("GitHub profile").first();
    await expect(githubLink).toHaveAttribute("href", "https://github.com/bilalwebs");

    const linkedinLink = page.getByLabelText("LinkedIn profile").first();
    await expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/bilalwebs");
  });
});
