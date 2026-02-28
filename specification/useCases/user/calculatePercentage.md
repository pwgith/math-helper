# Calculate Percentage

## Metadata

| Field            | Value                          |
|------------------|--------------------------------|
| **ID**           | UC-USR-001                     |
| **Actor**        | User                           |
| **Priority**     | High                           |
| **Status**       | Draft                          |
| **Created**      | 2026-03-01                     |
| **Last Updated** | 2026-03-01                     |

## Summary

A user wants to calculate a percentage-based result — such as finding a percentage of a number, applying a percentage discount, or applying a percentage increase — and receive both the numeric answer and a plain-language explanation of how the calculation works.

## Preconditions

- The user has access to the application in a web browser.
- No authentication or login is required.

## Trigger

The user navigates to the percentage calculator and indicates the type of percentage calculation they want to perform.

## Main Flow (Happy Path)

1. The user selects the type of percentage calculation they want to perform: **percentage of a number**, **percentage discount**, or **percentage increase**.
2. The system presents input fields appropriate to the selected calculation type.
3. The user enters the required values (e.g., the percentage value and the base number).
4. The user submits the calculation.
5. The system validates that the inputs are numeric and within reasonable bounds.
6. The system performs the percentage calculation.
7. The system displays the numeric result clearly.
8. The system displays a step-by-step explanation of the calculation, describing what was done and why the method works.
9. The system displays a shortcut tip showing a single-multiplication equivalent for the calculation (e.g., "Shortcut: multiply by 0.2 to find 20%").

## Alternative Flows

### Select a Different Calculation Type

- **Branches from**: Step 1 of Main Flow
- The user changes their mind and selects a different calculation type. The system updates the input fields to match the newly selected type and clears any previously entered values. The flow continues from Step 2.

### Calculate Another Percentage

- **Branches from**: Step 9 of Main Flow
- After viewing the result, explanation, and shortcut tip, the user modifies the input values or selects a different calculation type to perform another calculation. The flow continues from Step 2.

## Exception Flows

### Invalid Input

- **Triggered at**: Step 5 of Main Flow
- The user enters non-numeric characters, leaves a required field empty, or enters a value outside reasonable bounds (e.g., a negative number). The system displays an error alert identifying which field is invalid and what is expected. The user corrects the input and resubmits. The flow resumes at Step 4.

### Zero Base Number

- **Triggered at**: Step 5 of Main Flow
- The user enters zero as the base number for a discount or increase calculation. The system accepts the input, calculates the result as zero, and provides an explanation noting that any percentage of zero is zero. The flow continues from Step 7.

## Postconditions

- The user has received the correct numeric result of their percentage calculation.
- The user has received a clear, practical explanation of how and why the calculation works.

## Business Rules

- All three calculation types must be supported: percentage of a number, percentage discount, and percentage increase.
- The explanation must describe the mathematical steps in plain language (e.g., "To find 20% of 150, multiply 150 by 20/100 — that means 150 × 20 = 3000, then divide by 100, which gives 30").
- The explanation must include why the method works, not just the arithmetic steps.
- The explanation must include a shortcut tip that shows the single-multiplier equivalent for the calculation. For a percentage of a number, the multiplier is the percentage divided by 100 (e.g., "multiply by 0.1 to find 10%"). For a discount, the multiplier is (100 − percentage) / 100 — because 100% is made up of the discount portion and the portion you keep (e.g., "100% is made up of 15% discount and 85% keep — you're interested in the part you keep, so multiply by 85 / 100 = 0.85"). For an increase, the multiplier is (100 + percentage) / 100 — because you keep the original 100% and add the increase on top (e.g., "A 15% increase means you have 100% + 15% = 115% — that's 115 / 100 = 1.15, so multiply by 1.15").
- Results should be displayed to a reasonable precision (e.g., two decimal places for currency-related calculations).
- No login or user account is required to use the calculator.

## UI Reference

[./design/ui/calculatePercentage.html](../../design/ui/calculatePercentage.html)

## Features

Trace to Gherkin feature files that implement this use case (maintained as features are created):

| Feature ID | Scenario IDs                                                      | Description                                                    |
|------------|-------------------------------------------------------------------|----------------------------------------------------------------|
| F-001      | S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-034 | Calculate percentage (of a number, discount, and increase) |

## Notes

- The three percentage calculation types cover the most common real-world scenarios: "What is X% of Y?", "What is Y after an X% discount?", and "What is Y after an X% increase?".
- The explanation component is a core differentiator — the goal is not just to give an answer but to help the user understand the underlying mathematics.
- Consider whether the explanation should also show the general formula alongside the worked example.
