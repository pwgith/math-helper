@F-003 @UC-USR-003
Feature: Convert units
  As a user
  I want to convert a value from one unit to another within compatible categories
  So that I can get the converted result and understand how the conversion works

  @S-022 @UC-USR-003
  Scenario Outline: Convert length units
    Given the user has entered <value> as the value
    And the user has selected "<fromUnit>" as the input unit
    And the user has selected "<toUnit>" as the output unit
    When the user submits the conversion
    Then the result "<result>" is displayed

    Examples:
      | value | fromUnit    | toUnit     | result  |
      | 5     | kilometres  | miles      | 3.1069  |
      | 100   | centimetres | inches     | 39.3701 |
      | 1     | mile        | kilometres | 1.6093  |
      | 3     | feet        | metres     | 0.9144  |

  @S-023 @UC-USR-003
  Scenario Outline: Convert weight units
    Given the user has entered <value> as the value
    And the user has selected "<fromUnit>" as the input unit
    And the user has selected "<toUnit>" as the output unit
    When the user submits the conversion
    Then the result "<result>" is displayed

    Examples:
      | value | fromUnit  | toUnit | result   |
      | 2.5   | kilograms | pounds | 5.5116   |
      | 500   | grams     | ounces | 17.637   |
      | 1     | pound     | grams  | 453.5924 |

  @S-024 @UC-USR-003
  Scenario Outline: Convert volume units
    Given the user has entered <value> as the value
    And the user has selected "<fromUnit>" as the input unit
    And the user has selected "<toUnit>" as the output unit
    When the user submits the conversion
    Then the result "<result>" is displayed

    Examples:
      | value | fromUnit    | toUnit  | result |
      | 5     | litres      | gallons | 1.3209 |
      | 1000  | millilitres | litres  | 1      |
      | 2     | gallons     | litres  | 7.5708 |

  @S-025 @UC-USR-003
  Scenario Outline: Convert temperature units
    Given the user has entered <value> as the value
    And the user has selected "<fromUnit>" as the input unit
    And the user has selected "<toUnit>" as the output unit
    When the user submits the conversion
    Then the result "<result>" is displayed

    Examples:
      | value | fromUnit   | toUnit     | result |
      | 100   | Celsius    | Fahrenheit | 212    |
      | 0     | Celsius    | Fahrenheit | 32     |
      | 32    | Fahrenheit | Celsius    | 0      |
      | -40   | Celsius    | Fahrenheit | -40    |
      | 0     | Celsius    | Kelvin     | 273.15 |

  @S-026 @UC-USR-003
  Scenario: Explanation shows conversion factor for simple unit conversion
    Given the user has entered 5 as the value
    And the user has selected "kilometres" as the input unit
    And the user has selected "metres" as the output unit
    When the user submits the conversion
    Then the result "5000" is displayed
    And the explanation shows the conversion factor used
    And the explanation describes why the factor works

  @S-027 @UC-USR-003
  Scenario: Temperature conversion explanation shows the formula
    Given the user has entered 100 as the value
    And the user has selected "Celsius" as the input unit
    And the user has selected "Fahrenheit" as the output unit
    When the user submits the conversion
    Then the result "212" is displayed
    And the explanation shows the formula used for the conversion
    And the explanation describes why the formula works

  @S-028 @UC-USR-003
  Scenario: Incompatible units are rejected with an explanation
    Given the user has entered 5 as the value
    And the user has selected "litres" as the input unit
    And the user has selected "Celsius" as the output unit
    When the user submits the conversion
    Then no conversion result is displayed
    And an explanation states that litres measure volume and Celsius measures temperature
    And the explanation states that converting between different physical quantities is not meaningful

  @S-029 @UC-USR-003
  Scenario: Convert another value after viewing a result
    Given the user has converted 5 kilometres to miles and received the result "3.1069"
    When the user enters 10 as the value
    And the user selects "metres" as the input unit
    And the user selects "feet" as the output unit
    And the user submits the conversion
    Then the result "32.8084" is displayed

  @S-030 @UC-USR-003
  Scenario: Non-numeric input is rejected with an error
    Given the user has entered "xyz" as the value
    And the user has selected "kilometres" as the input unit
    And the user has selected "miles" as the output unit
    When the user submits the conversion
    Then an error is displayed identifying the value field as invalid

  @S-031 @UC-USR-003
  Scenario: Empty value field is rejected with an error
    Given the user has left the value field empty
    And the user has selected "kilograms" as the input unit
    And the user has selected "pounds" as the output unit
    When the user submits the conversion
    Then an error is displayed identifying the value field as required

  @S-032 @UC-USR-003
  Scenario: Zero value is accepted and converted normally
    Given the user has entered 0 as the value
    And the user has selected "kilometres" as the input unit
    And the user has selected "miles" as the output unit
    When the user submits the conversion
    Then the result "0" is displayed

  @S-033 @UC-USR-003
  Scenario: Negative value is accepted and converted normally
    Given the user has entered -40 as the value
    And the user has selected "Celsius" as the input unit
    And the user has selected "Fahrenheit" as the output unit
    When the user submits the conversion
    Then the result "-40" is displayed
