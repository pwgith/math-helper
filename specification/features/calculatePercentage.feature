@F-001 @UC-USR-001
Feature: Calculate percentage
  As a user
  I want to calculate a percentage of a number, a percentage discount, or a percentage increase
  So that I can get the numeric result and understand how the calculation works

  @S-001 @UC-USR-001
  Scenario Outline: Calculate a percentage of a number
    Given the user has selected the "percentage of a number" calculation type
    And the user has entered <percentage> as the percentage value
    And the user has entered <number> as the base number
    When the user submits the calculation
    Then the result "<result>" is displayed

    Examples:
      | percentage | number | result |
      | 20         | 150    | 30     |
      | 15         | 200    | 30     |
      | 50         | 80     | 40     |

  @S-002 @UC-USR-001
  Scenario Outline: Calculate a percentage discount
    Given the user has selected the "percentage discount" calculation type
    And the user has entered <percentage> as the percentage value
    And the user has entered <number> as the base number
    When the user submits the calculation
    Then the result "<result>" is displayed

    Examples:
      | percentage | number | result |
      | 20         | 100   | 80     |
      | 10         | 250   | 225    |
      | 15         | 39.90 | 33.92  |

  @S-003 @UC-USR-001
  Scenario Outline: Calculate a percentage increase
    Given the user has selected the "percentage increase" calculation type
    And the user has entered <percentage> as the percentage value
    And the user has entered <number> as the base number
    When the user submits the calculation
    Then the result "<result>" is displayed

    Examples:
      | percentage | number | result |
      | 15         | 200    | 230    |
      | 50         | 100    | 150    |
      | 8          | 500    | 540    |

  @S-004 @UC-USR-001
  Scenario: Explanation describes the mathematical steps and reasoning
    Given the user has selected the "percentage of a number" calculation type
    And the user has entered 20 as the percentage value
    And the user has entered 150 as the base number
    When the user submits the calculation
    Then a step-by-step explanation of the calculation is displayed
    And the explanation describes what was done and why the method works

  @S-005 @UC-USR-001
  Scenario: Selecting a different calculation type clears previous values
    Given the user has selected the "percentage of a number" calculation type
    And the user has entered 20 as the percentage value
    And the user has entered 150 as the base number
    When the user selects the "percentage discount" calculation type
    Then the input fields are cleared
    And the input fields match the "percentage discount" calculation type

  @S-006 @UC-USR-001
  Scenario: Calculate another percentage after viewing a result
    Given the user has calculated 20% of 150 and received the result 30
    When the user enters 10 as the percentage value
    And the user enters 200 as the base number
    And the user submits the calculation
    Then the result "20" is displayed

  @S-007 @UC-USR-001
  Scenario: Non-numeric input is rejected with an error
    Given the user has selected the "percentage of a number" calculation type
    And the user has entered "abc" as the percentage value
    And the user has entered 100 as the base number
    When the user submits the calculation
    Then an error is displayed identifying the percentage field as invalid

  @S-008 @UC-USR-001
  Scenario: Empty required field is rejected with an error
    Given the user has selected the "percentage discount" calculation type
    And the user has entered 20 as the percentage value
    And the user has left the base number field empty
    When the user submits the calculation
    Then an error is displayed identifying the base number field as required

  @S-009 @UC-USR-001
  Scenario: Value outside reasonable bounds is rejected with an error
    Given the user has selected the "percentage discount" calculation type
    And the user has entered 20 as the percentage value
    And the user has entered -50 as the base number
    When the user submits the calculation
    Then an error is displayed explaining the value is outside reasonable bounds

  @S-010 @UC-USR-001
  Scenario: Zero base number returns zero with explanation
    Given the user has selected the "percentage increase" calculation type
    And the user has entered 25 as the percentage value
    And the user has entered 0 as the base number
    When the user submits the calculation
    Then the result "0" is displayed
    And the explanation notes that any percentage of zero is zero

  @S-034 @UC-USR-001
  Scenario Outline: Explanation includes a shortcut multiplier tip
    Given the user has selected the "<type>" calculation type
    And the user has entered <percentage> as the percentage value
    And the user has entered <number> as the base number
    When the user submits the calculation
    Then the explanation includes a shortcut tip
    And the shortcut tip shows "multiply by <multiplier>" as the single-step equivalent

    Examples:
      | type                    | percentage | number | multiplier |
      | percentage of a number  | 10         | 200    | 0.1        |
      | percentage of a number  | 25         | 80     | 0.25       |
      | percentage discount     | 15         | 100    | 0.85       |
      | percentage discount     | 20         | 250    | 0.8        |
      | percentage increase     | 15         | 200    | 1.15       |
      | percentage increase     | 50         | 100    | 1.5        |
