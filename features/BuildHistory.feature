Feature: Build history is captured
  As build results come in
  a history of builds is captured
  so we can know how well the build is doing over time

  Scenario: Current status is captured when a new status comes in
    Given the build history is empty
    And the build run by "Aaron" at 3:06 PM was successful
    When the build run posts it's results
    Then the build history is:
      | what  | who   | when    |
      | FIXED | Aaron | 3:06 PM |

  Scenario: History is not destroyed by updates
    Given the current build history is:
      | what  | who   | when    |
      | BORKD | Dave  | 2:00 PM |
      | FIXED | Aaron | 2:15 PM |
    And the build run by "Dave" at 3:06 PM was unsuccessful
    When the build run posts it's results
    Then the build history is:
      | what  | who   | when    |
      | BORKD | Dave  | 2:00 PM |
      | FIXED | Aaron | 2:15 PM |
      | BORKD | Dave  | 3:06 PM |
