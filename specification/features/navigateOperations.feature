@F-004 @UC-USR-004
Feature: Navigate operations
  As a user
  I want to see all available math helper operations and choose one
  So that I can quickly find and use the tool I need

  @S-035 @UC-USR-004
  Scenario: Landing page displays all available operations
    Given the user opens the application
    Then the landing page is displayed
    And the landing page shows the "Calculate Percentage" operation with a brief description
    And the landing page shows the "Calculate Square Metres" operation with a brief description
    And the landing page shows the "Convert Units" operation with a brief description

  @S-036 @UC-USR-004
  Scenario: User selects an operation from the landing page
    Given the user is on the landing page
    When the user selects the "Calculate Percentage" operation
    Then the user is navigated to the percentage calculator

  @S-037 @UC-USR-004
  Scenario: Navigation menu is visible on the landing page
    Given the user is on the landing page
    Then a navigation menu is displayed listing all available operations

  @S-038 @UC-USR-004
  Scenario: User selects an operation from the navigation menu
    Given the user is on the landing page
    When the user selects "Convert Units" from the navigation menu
    Then the user is navigated to the unit converter

  @S-039 @UC-USR-004
  Scenario: User switches operation via the navigation menu
    Given the user is using the "Calculate Percentage" operation
    When the user selects "Calculate Square Metres" from the navigation menu
    Then the user is navigated to the square metres calculator

  @S-040 @UC-USR-004
  Scenario: Navigation menu is accessible from an operation page
    Given the user is using the "Convert Units" operation
    Then a navigation menu is displayed listing all available operations

  @S-041 @UC-USR-004
  Scenario: User returns to the landing page from an operation
    Given the user is using the "Calculate Percentage" operation
    When the user selects the home link in the navigation menu
    Then the landing page is displayed
    And the landing page shows all available operations

  @S-042 @UC-USR-004
  Scenario: Previously entered input is not preserved when switching operations
    Given the user is using the "Calculate Percentage" operation
    And the user has entered values into the input fields
    When the user selects "Convert Units" from the navigation menu
    And the user selects "Calculate Percentage" from the navigation menu
    Then the input fields on the percentage calculator are empty

  @S-043 @UC-USR-004
  Scenario: Navigation menu lists the same operations as the landing page
    Given the user is on the landing page
    Then the navigation menu lists the same operations as the landing page
