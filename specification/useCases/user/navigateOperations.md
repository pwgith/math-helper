# Navigate Operations

## Metadata

| Field            | Value                          |
|------------------|--------------------------------|
| **ID**           | UC-USR-004                     |
| **Actor**        | User                           |
| **Priority**     | High                           |
| **Status**       | Draft                          |
| **Created**      | 2026-03-01                     |
| **Last Updated** | 2026-03-01                     |

## Summary

A user wants to browse the available math helper operations and choose one to use. The user can do this from the landing page when they first open the app, or from the navigation menu at any time while using the app.

## Preconditions

- The user has access to the application in a web browser.
- No authentication or login is required.

## Trigger

The user opens the application, or the user activates the navigation menu while already using an operation.

## Main Flow (Happy Path)

1. The user opens the application.
2. The system displays the landing page showing all available math helper operations with a title, brief description, and visual indicator for each.
3. The system displays a persistent navigation menu that also lists all available operations.
4. The user selects an operation from the landing page.
5. The system navigates the user to the selected operation.

## Alternative Flows

### Navigate via Menu

- **Branches from**: Step 4 of Main Flow
- Instead of selecting an operation from the landing page, the user opens the navigation menu and selects an operation from there. The flow continues from Step 5.

### Switch Operation via Menu

- **Branches from**: Step 5 of Main Flow
- While using an operation, the user opens the navigation menu and selects a different operation. The system navigates the user to the newly selected operation. Any previously entered input on the prior operation is not preserved.

### Return to Landing Page

- **Branches from**: Step 5 of Main Flow
- While using an operation, the user navigates back to the landing page (e.g., by selecting the app title or a home link in the menu). The system displays the landing page again. The flow continues from Step 2.

## Exception Flows

### No Operations Available

- **Triggered at**: Step 2 of Main Flow
- The application has no operations configured. The system displays a friendly message indicating that no operations are available yet. The user cannot proceed further.

## Postconditions

- The user has been presented with the available operations and has navigated to their chosen operation.
- The navigation menu remains accessible for the user to switch operations at any time.

## Business Rules

- The landing page must display all available operations so the user can see everything the app offers at a glance.
- Each operation on the landing page must show a title and a brief description so the user understands what it does before selecting it.
- The navigation menu must be accessible from every page in the application, allowing the user to switch operations at any time.
- The navigation menu must list the same operations as the landing page for consistency.
- The current operations are:
  - [UC-USR-001 Calculate Percentage](./calculatePercentage.md) — Calculate a percentage of a number, a percentage discount, or a percentage increase.
  - [UC-USR-002 Calculate Square Metres](./calculateSquareMetres.md) — Calculate an area in square metres from length and width with unit support.
  - [UC-USR-003 Convert Units](./convertUnits.md) — Convert a value from one unit of measurement to another.
- No login or user account is required.

## UI Reference

[./design/ui/navigateOperations.html](../../design/ui/navigateOperations.html)

## Features

Trace to Gherkin feature files that implement this use case (maintained as features are created):

| Feature ID | Scenario IDs                                                      | Description                                |
|------------|-------------------------------------------------------------------|--------------------------------------------|
| F-004      | S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043    | Navigate operations (landing page and menu) |

## Notes

- The landing page is the user's first impression of the app — it should clearly communicate the purpose and available tools.
- As new operations are added to the app, they should automatically appear on the landing page and in the navigation menu.
- The navigation menu provides a consistent way to move between operations without returning to the landing page.
