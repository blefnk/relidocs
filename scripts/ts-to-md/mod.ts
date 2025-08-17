// 👉 `bun scripts/ts-to-md/mod.ts`

import { AVAILABLE_CATEGORIES, DEFAULT_RETRIES_NUMBER } from "~/utils/ts-to-md/constants";
import { generateMarkdownTable } from "~/utils/ts-to-md/impl";
import { projects } from "~/utils/ts-to-md/projects";
import type { Project, ProjectCategory } from "~/utils/ts-to-md/types";
import {
  findProjectById,
  getAllProjects,
  getOpenSourceProjects,
  getProjectsByCategory,
  getProjectsByStatus,
  getProjectsByTag,
  getProjectsByTech,
  getProjectsWithNoReleases,
  getProjectsWithReleasesBeforeDate,
  getProjectsWithReleasesBetweenDates,
  getProjectUniqueId,
} from "~/utils/ts-to-md/utils";

// === Configuration ===
// Change the number below to
// run a different example (1-10)
const EXAMPLE_TO_RUN = 6; // 6 is recommended
// ===================

// Derives the category keys
// (i.e. ['template', 'collection', 'library', 'cli', 'saas'])
// which should be included in the markdown table.
const categories = Object.keys(AVAILABLE_CATEGORIES) as ProjectCategory[];

/**
 * Examples of using the date-based query functions
 */
async function dateQueryExamples(projects: readonly Project[]) {
  console.log("\n===== Date-Based Query Functions =====\n");

  // Get projects with releases before a specific date
  console.log("\n👇 Projects with releases before January 1, 2025");
  const beforeProjects = await getProjectsWithReleasesBeforeDate(projects, "01-01-2025");
  console.log(
    `Found ${beforeProjects.length} projects with releases before 2025 or no release info`,
  );

  // Get open-source projects with releases before 6 months ago, sorted by name
  console.log("\n👇 OSS projects with releases before 6 months ago, sorted alphabetically");
  const oldOssProjects = await getProjectsWithReleasesBeforeDate(projects, "6 months ago", {
    ossOnly: true,
    sortBy: "name",
    sortDirection: "asc",
  });
  console.log(`Found ${oldOssProjects.length} OSS projects with old or no releases`);
  console.log("First 5 projects (alphabetically):");
  oldOssProjects.slice(0, 5).forEach((p: Project) => console.log(`- ${p.id}: ${p.title}`));

  // Get projects with releases after 6 months ago (recent projects)
  console.log("\n👇 Projects with releases in the last 6 months");
  const recentProjects = await getProjectsWithReleasesBetweenDates(
    projects,
    "6 months ago",
    "today",
  );
  console.log(`Found ${recentProjects.length} projects with recent releases`);

  // Get projects released within a specific date range
  console.log("\n👇 Projects released in 2025");
  const projects2025 = await getProjectsWithReleasesBetweenDates(
    projects,
    "01-01-2025",
    "15-04-2025",
    {
      ossOnly: true,
      sortBy: "releaseDate",
      sortDirection: "asc",
    },
  );
  console.log(`Found ${projects2025.length} projects released in 2025`);

  // Get projects released in a relative timeframe
  console.log("\n👇 Projects released in the last 3 months, sorted by category");
  const last3MonthsProjects = await getProjectsWithReleasesBetweenDates(
    projects,
    "3 months ago",
    "today",
    {
      ossOnly: true,
      sortBy: "category",
      sortDirection: "asc",
    },
  );
  console.log(`Found ${last3MonthsProjects.length} projects released in the last 3 months`);

  // Get projects with no release information
  console.log("\n👇 Projects with no release information");
  const projectsWithNoReleaseInfo = await getProjectsWithNoReleases(projects, {
    ossOnly: true, // Only show open source projects
    sortBy: "name",
  });
  console.log(`Found ${projectsWithNoReleaseInfo.length} OSS projects with no release information`);

  // Show support for natural language date expressions
  console.log("\n👇 Demonstrating natural language date expressions");
  console.log("Projects released yesterday or today:");
  const veryRecentProjects = await getProjectsWithReleasesBetweenDates(
    projects,
    "yesterday",
    "today",
  );
  console.log(`Found ${veryRecentProjects.length} very recent projects`);

  console.log("\nProjects released in the last year but not in the last month:");
  const lastYearNotLastMonth = await getProjectsWithReleasesBetweenDates(
    projects,
    "1 year ago",
    "1 month ago",
  );
  console.log(`Found ${lastYearNotLastMonth.length} projects`);

  process.exit(0);
}

if (EXAMPLE_TO_RUN < 1 || EXAMPLE_TO_RUN > 10) {
  console.error("Invalid example number selected. Please choose between 1 and 10.");
} else {
  runExample(EXAMPLE_TO_RUN);
}

async function exampleFunctions() {
  const allProjects = getAllProjects(projects);
  const firstProject = allProjects[0];

  console.log("👇 getAllProjects");
  allProjects.sort((a, b) => a.id.localeCompare(b.id));
  console.log(`${allProjects.length} projects found:`);
  for (const p of allProjects) {
    console.log(p.id);
  }

  console.log("👇 getProjectUniqueId");
  if (firstProject) {
    console.log(getProjectUniqueId(firstProject));
  } else {
    console.log("No projects available");
  }

  console.log("👇 findProjectById");
  if (firstProject) {
    console.log(findProjectById(projects, firstProject.id));
  } else {
    console.log("No projects available");
  }

  console.log("👇 getOpenSourceProjects");
  console.log(`${getOpenSourceProjects(projects).length} open source projects`);

  console.log("👇 getProjectsByStatus");
  console.log(`${getProjectsByStatus(projects, "ACTIVE").length} active projects`);

  console.log("👇 getProjectsByCategory");
  console.log(`${getProjectsByCategory(projects, "library").length} library projects`);

  console.log("👇 getProjectsByTag");
  console.log(`${getProjectsByTag(projects, "cli").length} projects with 'cli' tag`);

  console.log("👇 getProjectsByTech");
  console.log(`${getProjectsByTech(projects, "Polar").length} projects with 'Polar' tech`);

  process.exit(0);
}

/**
 * Runs a specific example for generating the markdown table.
 *
 * Examples:
 * 1. Basic usage with default options.
 * 2. Automatic version fetching (fetches latest release tag; overrides project-level `version`).
 * 3. Fetches GitHub stars and latest release versions.
 * 4. Uses custom icons for open-source and private projects.
 * 5. Shows project status indicators (e.g. 🟢🟠🟣⚫).
 * 6. Sorts projects by stars (descending). Requires 'stars: true'.
 * 7. Uses GitHub API directly instead of UNGH (slower, rate-limited).
 * 8. Demonstrates custom caching and retry configuration.
 * 9. Demonstrates helper functions.
 * 10. Date-based queries for project releases.
 */
async function runExample(exampleToRun: number): Promise<void> {
  console.log(`\n🚀 Running Example ${exampleToRun}...\n`);

  try {
    let markdownResult: string;

    switch (exampleToRun) {
      case 1:
        console.log("Example 1: Basic table with default options");
        markdownResult = await generateMarkdownTable({ categories });
        break;

      case 2:
        console.log("\n---\nExample 2: With automatic version fetching");
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          categories,
        });
        break;

      case 3:
        console.log("\n---\nExample 3: With GitHub stars and automatic versioning");
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          categories,
          stars: true,
        });
        break;

      case 4:
        console.log("\n---\nExample 4: With custom icons for open-source and private projects");
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          categories,
          ossIcon: "✅",
          privateIcon: "🔒",
          stars: true,
        });
        break;

      case 5:
        console.log("\n---\nExample 5: With project status indicators");
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          categories,
          showStatus: true,
          stars: true,
          statusIcons: {
            ACTIVE: "�",
            DEPRECATED: "�",
            MAINTENANCE: "🔧",
            PLANNING: "💡",
          },
        });
        break;

      case 6:
        console.log("\n---\nExample 6: Sorted by stars (descending)");
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          categories,
          showStatus: true,
          sortBy: "stars",
          sortDirection: "desc",
          stars: true,
        });
        break;

      case 7:
        console.log(
          "\n---\nExample 7: Using GitHub API instead of UNGH (slower, potentially rate-limited)",
        );
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          categories,
          stars: true,
          useUngh: false, // Force use of GitHub API
        });
        break;

      case 8:
        console.log("\n---\nExample 8: With custom caching and retry configuration");
        markdownResult = await generateMarkdownTable({
          autoVersion: true,
          cacheDuration: 7200, // 2 hours cache
          categories,
          enableCache: true, // Ensure cache is on
          retries: DEFAULT_RETRIES_NUMBER, // Retry up to DEFAULT_RETRIES_NUMBER times on failure
          stars: true,
          timeout: 4000, // 4 seconds timeout per request
          // !! DEFAULT_RETRIES_NUMBER=0 -- // TODO: temporarily makes processing faster to force "API rate limit exceeded"
          // TODO: do not show "Resource not found" error and handle 404 silencly (unless `strict` boolean passed)
        });
        break;

      case 9:
        console.log("\n---\nExample 9: Helper functions");
        await exampleFunctions();
        return;

      case 10:
        console.log("\n---\nExample 10: Date-based queries");
        await dateQueryExamples(projects);
        return;

      default:
        console.error(`❌ Error: Example ${exampleToRun} does not exist.`);
        return;
    }

    console.log(markdownResult);
    console.log(`✅ Example ${exampleToRun} finished.`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error running Example ${exampleToRun}:`, error);
  }
}
