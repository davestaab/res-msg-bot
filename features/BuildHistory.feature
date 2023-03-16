Feature: Build history is captured
  As build results come in
  a history of builds is captured
  so we can know how well the build is doing over time

  Scenario: Current status is captured when a new status comes in
    Given the build history is empty
    And the build status is currently BORKD by "Dave" at 02:00 PM with count 2
    And the build run by "Aaron" at 3:06 PM was successful
    When the build run posts it's results
    Then the build history is:
      | what  | who  | when    | count |
      | BORKD | Dave | 2:00 PM |     2 |
    And the build status is FIXED by "Aaron" at 03:06 PM with a count of 1

  Scenario: History is not destroyed by updates
    Given the current build history is:
      | what  | who   | when    | count |
      | BORKD | Dave  | 2:00 PM |     3 |
      | FIXED | Aaron | 2:15 PM |     2 |
    And the build status is currently BORKD by "Shannon" at 03:00 PM with count 4
    And the build run by "Dave" at 3:06 PM was successful
    When the build run posts it's results
    Then the build history is:
      | what  | who     | when    | count |
      | BORKD | Dave    | 2:00 PM |     3 |
      | FIXED | Aaron   | 2:15 PM |     2 |
      | BORKD | Shannon | 3:00 PM |     4 |
    And the build status is FIXED by "Dave" at 03:06 PM with a count of 1

  Scenario: History is not saved when just the count is updated
    Given the current build history is:
      | what  | who  | when    | count |
      | BORKD | Dave | 2:00 PM |     5 |
    And the build status is currently FIXED by "Aaron" at 2:15 PM with count 2
    And the build run by "Dave" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Aaron" at 2:15 PM with a count of 3
    And the build history is:
      | what  | who  | when    | count |
      | BORKD | Dave | 2:00 PM |     5 |
