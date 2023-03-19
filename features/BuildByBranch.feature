Feature: Builds are tracked by branch
As build results comme in
They are processed by branch
so each branch has its own status

  Background: 
    Given no build statuses exist

  Scenario: New branch is run with successful results
    Given the build run by "Dave" for branch "release/new-branch" at 02:00 PM was successful
    When the build run posts it's results
    Then the build status map is:
      | branch             | who  | what  | when     | count |
      | release/new-branch | Dave | FIXED | 02:00 PM |     1 |

  Scenario: New branch is run with unsuccessful results
    Given the build run by "Dave" for branch "release/new-branch" at 02:00 PM was unsuccessful
    When the build run posts it's results
    Then the build status map is:
      | branch             | who  | what  | when     | count |
      | release/new-branch | Dave | BORKD | 02:00 PM |     1 |
