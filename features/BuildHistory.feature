Feature: Build history is captured
  As build results come in
  a history of builds is captured
  so we can know how well the build is doing over time

  Scenario: Current status is captured when a new status comes in
    Given the build history is empty
    And the build run by "Aaron" at 3:06 PM was successful
    When the build run posts it's results
    Then the build history is:
      | what  | who   | when    | count |
      | FIXED | Aaron | 3:06 PM | 1     |

  Scenario: History is not destroyed by updates
    Given the current build history is:
      | what  | who   | when    | count |
      | BORKD | Dave  | 2:00 PM | 1     |
      | FIXED | Aaron | 2:15 PM | 1     |
    And the build run by "Dave" at 3:06 PM was unsuccessful
    When the build run posts it's results
    Then the build history is:
      | what  | who   | when    | count |
      | BORKD | Dave  | 2:00 PM | 1     |
      | FIXED | Aaron | 2:15 PM | 1     |
      | BORKD | Dave  | 3:06 PM | 1     |

  Scenario: History is not saved when just the count is updated
    Given the current build history is:
      | what  | who   | when    | count |
      | BORKD | Dave  | 2:00 PM | 1     |
    And the build status is currently FIXED by "Aaron" at 2:15 PM
    And the build run by "Dave" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Aaron" at 2:15 PM with a count of 2
    Then the build history is:
      | what  | who   | when    | count |
      | BORKD | Dave  | 2:00 PM | 1     |
