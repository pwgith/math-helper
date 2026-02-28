# Calculate Square Metres

## Metadata

| Field            | Value                          |
|------------------|--------------------------------|
| **ID**           | UC-USR-002                     |
| **Actor**        | User                           |
| **Priority**     | High                           |
| **Status**       | Draft                          |
| **Created**      | 2026-03-01                     |
| **Last Updated** | 2026-03-01                     |

## Summary

A user wants to calculate the area in square metres from two measurements (length and width), where each measurement can be entered in different units. The system displays the result in square metres along with a full breakdown of the calculation, and additionally shows the result converted into other square units for reference.

## Preconditions

- The user has access to the application in a web browser.
- No authentication or login is required.

## Trigger

The user navigates to the square metres calculator.

## Main Flow (Happy Path)

1. The system presents two input fields (length and width), each with a unit selector offering **mm**, **cm**, **m**, and **km**.
2. The user enters a numeric value for the length and selects its unit.
3. The user enters a numeric value for the width and selects its unit.
4. The user submits the calculation.
5. The system validates that both inputs are numeric and greater than zero.
6. The system converts both inputs to metres, showing how each conversion was done and why (e.g., "150 cm ÷ 100 = 1.5 m, because there are 100 cm in a metre" and "2000 mm ÷ 1000 = 2 m, because there are 1000 mm in a metre").
7. The system displays the multiplication being performed (e.g., "1.5 m × 2 m = 3 m²").
8. The system displays the result in square metres clearly, making it obvious this is the answer.
9. Below the main answer, the system displays the equivalent result in other square units (mm², cm², km²) as additional reference information.

## Alternative Flows

### Change Units After Entry

- **Branches from**: Step 2 or Step 3 of Main Flow
- The user changes the unit selector for a measurement after entering a value. The system retains the entered number and associates it with the newly selected unit. The flow continues from Step 4.

### Calculate Another Area

- **Branches from**: Step 9 of Main Flow
- After viewing the result, the user modifies the input values or units to perform another calculation. The flow continues from Step 4.

## Exception Flows

### Invalid Input

- **Triggered at**: Step 5 of Main Flow
- The user enters non-numeric characters or leaves a required field empty. The system displays an error alert identifying which field is invalid and what is expected. The user corrects the input and resubmits. The flow resumes at Step 4.

### Zero or Negative Value

- **Triggered at**: Step 5 of Main Flow
- The user enters zero or a negative number for length or width. The system displays an error alert explaining that both measurements must be greater than zero. The user corrects the input and resubmits. The flow resumes at Step 4.

## Postconditions

- The user has received the correct area in square metres.
- The user has seen the input values converted to metres, the calculation performed, and the result in square metres.
- The user has received the equivalent area in other square units for reference.

## Business Rules

- Supported input units are: millimetres (mm), centimetres (cm), metres (m), and kilometres (km).
- Each input independently selects its own unit — the two measurements do not need to share the same unit.
- The system must convert each input to metres before calculating the area, showing the arithmetic and explaining the conversion factor (e.g., "150 cm ÷ 100 = 1.5 m, because there are 100 centimetres in a metre").
- The conversion explanation must help the user understand why the division or multiplication is used for that unit.
- The system must show the multiplication step clearly (e.g., "1.5 m × 2 m = 3 m²").
- The primary result must be displayed in square metres (m²) and be visually prominent as the answer.
- The system must also display the result converted to mm², cm², and km² as supplementary information, clearly separated from the main answer.
- Results should be displayed to a reasonable precision (e.g., up to four decimal places, trimming trailing zeros).
- No login or user account is required to use the calculator.

## UI Reference

[./design/ui/calculateSquareMetres.html](../../design/ui/calculateSquareMetres.html)

## Features

Trace to Gherkin feature files that implement this use case (maintained as features are created):

| Feature ID | Scenario IDs                                                             | Description                                              |
|------------|--------------------------------------------------------------------------|----------------------------------------------------------|
| F-002      | S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021 | Calculate area in square metres with unit conversion |

## Notes

- The unit conversion factors to metres are: 1 mm = 0.001 m, 1 cm = 0.01 m, 1 m = 1 m, 1 km = 1000 m.
- The square unit conversions from m² are: 1 m² = 1,000,000 mm², 1 m² = 10,000 cm², 1 m² = 0.000001 km².
- The supplementary unit conversions should be presented as a "by the way" reference section, not competing visually with the primary m² answer.
- Consider whether additional input units (e.g., inches, feet) should be supported in a future iteration.
