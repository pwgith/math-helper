@F-002 @UC-USR-002
Feature: Calculate square metres
  As a user
  I want to calculate an area in square metres from length and width measurements in any supported unit
  So that I can see the result with a full breakdown and equivalent areas in other square units

  @S-011 @UC-USR-002
  Scenario Outline: Calculate area with both measurements in metres
    Given the user has entered <length> as the length in metres
    And the user has entered <width> as the width in metres
    When the user submits the calculation
    Then the result "<result> m²" is displayed

    Examples:
      | length | width | result |
      | 3      | 5     | 15     |
      | 10     | 10    | 100    |
      | 2.5    | 4     | 10     |

  @S-012 @UC-USR-002
  Scenario Outline: Calculate area with mixed units
    Given the user has entered <length> as the length in <lengthUnit>
    And the user has entered <width> as the width in <widthUnit>
    When the user submits the calculation
    Then the result "<result> m²" is displayed

    Examples:
      | length | lengthUnit | width | widthUnit | result |
      | 150    | cm         | 2000  | mm        | 3      |
      | 0.5    | km         | 200   | m         | 100000 |
      | 500    | cm         | 3     | m         | 15     |

  @S-013 @UC-USR-002
  Scenario: Conversion explanation is shown for each non-metre input
    Given the user has entered 150 as the length in cm
    And the user has entered 2000 as the width in mm
    When the user submits the calculation
    Then the explanation shows "150 cm ÷ 100 = 1.5 m" for the length conversion
    And the explanation shows "2000 mm ÷ 1000 = 2 m" for the width conversion
    And each conversion explains why the factor is used

  @S-014 @UC-USR-002
  Scenario: Multiplication step is displayed clearly
    Given the user has entered 150 as the length in cm
    And the user has entered 2000 as the width in mm
    When the user submits the calculation
    Then the explanation shows the multiplication "1.5 m × 2 m = 3 m²"

  @S-015 @UC-USR-002
  Scenario: Result is also shown in supplementary square units
    Given the user has entered 3 as the length in m
    And the user has entered 5 as the width in m
    When the user submits the calculation
    Then the result "15 m²" is displayed
    And the supplementary result "15000000 mm²" is displayed
    And the supplementary result "150000 cm²" is displayed
    And the supplementary result "0.000015 km²" is displayed

  @S-016 @UC-USR-002
  Scenario: Changing a unit selector retains the entered value
    Given the user has entered 150 as the length in cm
    When the user changes the length unit to mm
    Then the length value remains 150
    And the length unit is mm

  @S-017 @UC-USR-002
  Scenario: Calculate another area after viewing a result
    Given the user has calculated the area of 3 m × 5 m and received the result "15 m²"
    When the user enters 10 as the length in m
    And the user enters 10 as the width in m
    And the user submits the calculation
    Then the result "100 m²" is displayed

  @S-018 @UC-USR-002
  Scenario: Non-numeric input is rejected with an error
    Given the user has entered "abc" as the length in m
    And the user has entered 5 as the width in m
    When the user submits the calculation
    Then an error is displayed identifying the length field as invalid

  @S-019 @UC-USR-002
  Scenario: Empty required field is rejected with an error
    Given the user has left the length field empty
    And the user has entered 5 as the width in m
    When the user submits the calculation
    Then an error is displayed identifying the length field as required

  @S-020 @UC-USR-002
  Scenario: Zero value is rejected with an error
    Given the user has entered 0 as the length in m
    And the user has entered 5 as the width in m
    When the user submits the calculation
    Then an error is displayed explaining that both measurements must be greater than zero

  @S-021 @UC-USR-002
  Scenario: Negative value is rejected with an error
    Given the user has entered -3 as the length in m
    And the user has entered 5 as the width in m
    When the user submits the calculation
    Then an error is displayed explaining that both measurements must be greater than zero
