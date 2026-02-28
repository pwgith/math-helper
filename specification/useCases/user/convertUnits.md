# Convert Units

## Metadata

| Field            | Value                          |
|------------------|--------------------------------|
| **ID**           | UC-USR-003                     |
| **Actor**        | User                           |
| **Priority**     | High                           |
| **Status**       | Draft                          |
| **Created**      | 2026-03-01                     |
| **Last Updated** | 2026-03-01                     |

## Summary

A user wants to convert a value from one unit to another. The system supports conversions within compatible unit categories (e.g., length, weight, volume, temperature) and explains the calculation used. If the user selects an incompatible output unit, the system explains why the conversion is not possible.

## Preconditions

- The user has access to the application in a web browser.
- No authentication or login is required.

## Trigger

The user navigates to the unit converter.

## Main Flow (Happy Path)

1. The system presents an input field for the value, a selector for the input unit, and a selector for the output unit.
2. The user enters a numeric value.
3. The user selects the input unit (e.g., kilometres).
4. The user selects the desired output unit (e.g., miles).
5. The user submits the conversion.
6. The system validates that the input is numeric and that the selected units belong to the same category (e.g., both are length units).
7. The system performs the conversion.
8. The system displays the converted result clearly.
9. The system displays an explanation of the calculation used, describing the conversion factor and why it works (e.g., "1 kilometre = 0.621371 miles, so 5 km × 0.621371 = 3.1069 miles. This factor comes from the ratio between the two units of length").

## Alternative Flows

### Incompatible Output Unit

- **Branches from**: Step 6 of Main Flow
- The user has selected an output unit that belongs to a different category than the input unit (e.g., litres to degrees Celsius). The system does not perform a conversion. Instead, the system displays a clear explanation of why the conversion is not possible (e.g., "Litres measure volume while degrees Celsius measures temperature — these are different physical quantities, so converting between them is not meaningful"). The user selects a compatible output unit and the flow resumes at Step 5.

### Convert Another Value

- **Branches from**: Step 9 of Main Flow
- After viewing the result and explanation, the user modifies the value, changes the input unit, or changes the output unit to perform another conversion. The flow continues from Step 5.

## Exception Flows

### Invalid Input

- **Triggered at**: Step 6 of Main Flow
- The user enters non-numeric characters or leaves the value field empty. The system displays an error alert identifying what is expected. The user corrects the input and resubmits. The flow resumes at Step 5.

### Zero or Negative Value

- **Triggered at**: Step 6 of Main Flow
- The user enters zero or a negative number. The system accepts the input and performs the conversion normally, since zero and negative values are valid in many unit conversions (e.g., negative temperatures). The flow continues from Step 7.

## Postconditions

- The user has received the correctly converted value, or a clear explanation of why the selected conversion is not possible.
- The user has received an explanation of the conversion calculation and why it works.

## Business Rules

- Supported unit categories include at minimum: length (mm, cm, m, km, inches, feet, yards, miles), weight (mg, g, kg, pounds, ounces), volume (ml, litres, gallons, pints), and temperature (Celsius, Fahrenheit, Kelvin).
- Conversions are only valid within the same unit category. Cross-category conversions (e.g., litres to Celsius) must be rejected with an explanation.
- The incompatibility explanation must describe what each unit measures and why they cannot be converted (e.g., "Litres measure volume while degrees Celsius measures temperature").
- The conversion explanation must show the conversion factor or formula used and describe why it works (e.g., "There are 1000 metres in a kilometre, so to convert km to m, multiply by 1000").
- Temperature conversions must show the formula rather than a simple factor (e.g., "°C to °F: multiply by 9/5 then add 32, because the Fahrenheit scale has smaller degrees and a different zero point").
- Results should be displayed to a reasonable precision (e.g., up to four decimal places, trimming trailing zeros).
- No login or user account is required to use the converter.

## UI Reference

No UI mockup exists yet.

## Features

Trace to Gherkin feature files that implement this use case (maintained as features are created):

| Feature ID | Scenario IDs          | Description                     |
|------------|-----------------------|---------------------------------|
| F-NNN      | S-NNN, S-NNN          | _To be defined_                 |

## Notes

- The incompatible-unit explanation is a deliberate design choice — rather than hiding invalid options or silently preventing selection, the system lets the user make the mistake and then teaches them why it does not work.
- Temperature conversions use formulas rather than simple multiplication factors, so the explanation logic needs to handle both cases.
- Consider grouping units visually by category in the selectors to help users find what they need, while still allowing cross-category selection so the explanation flow can trigger.
- Future iterations could expand to additional categories such as time, speed, or data storage.
